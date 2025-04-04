import { cashInBonus, validateBonus } from '../../api/bonus';
import { AuthContext } from '../../contexts/AuthContext';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import config from "../../../config.json"; // Importar el archivo JSON de configuración

const schema = yup.object().shape({
  bonusCode: yup.string().required('El código del bono es obligatorio'),
  documentNumber: yup
    .string()
    .required('El número de documento es obligatorio')
    .test('valid-document', 'Número de documento inválido', function (value) {
      const documentType = this.parent.documentType;
      if (documentType === 'DNI') {
        return /^\d{8}$/.test(value); 
      } else if (documentType === 'CE' || documentType === 'PASAPORTE') {
        return value.length <= 20; 
      }
      return true;
    }),
  documentType: yup.string().required('El tipo de documento es obligatorio'),
  fullName: yup.string().required('El nombre completo es obligatorio'),
  ticketCode: yup.string().required('El código del ticket es obligatorio'),
});

const BonusComponent = () => {
  const { currentUser, hasRole } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [isValidating, setIsValidating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isBonusCodeReadOnly, setIsBonusCodeReadOnly] = useState(false);
  const [isBonusValid, setIsBonusValid] = useState(false);

  const documentType = watch('documentType');
  const MySwal = withReactContent(Swal);

  const validateBonusCode = async (bonusCode) => {
    try {
      setIsValidating(true);
      const result = await validateBonus(bonusCode);
      if (result.success) {
        toast.success(result.message || 'El bono es válido');
        setIsBonusCodeReadOnly(true);
        setIsBonusValid(true);
      } else {
        toast.error(result.message || 'El bono no es válido');
        setIsBonusValid(false);
      }
    } catch (error) {
      toast.error(error.message || 'Error al validar el bono');
      setIsBonusValid(false);
    } finally {
      setTimeout(() => setIsValidating(false), 2000);
    }
  };

  const searchDNI = async (documentNumber) => {
    const token = config.VITE_API_KEY;
    const url = `https://api.apuestatotal.com/v2/dni?dni=${documentNumber}`;

    try {
      setIsSearching(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const { nombres, apellido_paterno, apellido_materno } = data.result;
        setValue('fullName', `${nombres} ${apellido_paterno} ${apellido_materno}`);
        toast.success('Cliente encontrado en API de DNI!');
      } else {
        toast.error('Cliente no encontrado en API de DNI.');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      toast.error('Error buscando cliente.');
    } finally {
      setTimeout(() => setIsSearching(false), 2000);
    }
  };

  const confirmSubmission = async (data) => {
    return await MySwal.fire({
      title: <strong>Confirmar datos</strong>,
      html: (
        <div>
          <p className='text-blue-800'><strong>Cód. del Bono:</strong> {data.bonusCode}</p>
          <p><strong>Tipo de Doc.:</strong> {data.documentType}</p>
          <p><strong>N° de Doc.:</strong> {data.documentNumber}</p>
          <p className='text-red-700'><strong>Nombre:</strong> {data.fullName}</p>
          <p><strong>Cód. del Ticket:</strong> {data.ticketCode}</p>
        </div>
      ),
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc1515',

    });
  };

  const handleValidateBonus = () => {
    const bonusCode = watch('bonusCode');
    if (!bonusCode) {
      toast.error('Por favor, ingrese el código del bono');
      return;
    }
    validateBonusCode(bonusCode);
  };

  const handleSearchDNI = () => {
    const documentNumber = watch('documentNumber');
    if (documentType !== 'DNI') {
      toast.error('Solo se permite consulta por DNI.');
      return;
    }
    if (!documentNumber) {
      toast.error('Debe ingresar el número de documento.');
      return;
    }
    searchDNI(documentNumber);
  };

  const onSubmit = async (data) => {
    if (!isBonusValid) {
      toast.error('El código del bono debe estar validado antes de enviar');
      return;
    }

    const result = await confirmSubmission(data);
    if (!result.isConfirmed) {
      toast.info('Operación cancelada por el usuario');
      return;
    }

    if (!currentUser || !currentUser.userId) {
      toast.error('Usuario no autenticado');
      return;
    }

    try {
      await cashInBonus({ ...data, userId: currentUser.userId });
      toast.success('Bono canjeado exitosamente');
      reset();
      setIsBonusCodeReadOnly(false);
      setIsBonusValid(false);
    } catch (error) {
      toast.error(error.message || 'Error al canjear el bono');
    }
  };

  if (!hasRole('admin') && !hasRole('user')) {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Canjear Bono</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { label: 'Código del Bono', name: 'bonusCode', type: 'text', withValidateButton: true, readOnly: isBonusCodeReadOnly },
          { label: 'Tipo de Documento', name: 'documentType', type: 'select', options: ['DNI', 'PASAPORTE', 'CE'] },
          { label: 'Número de Documento', name: 'documentNumber', type: 'text', withSearchButton: true },
          { label: 'Nombre Completo', name: 'fullName', type: 'text', readOnly: documentType === 'DNI' },
          { label: 'Código del Ticket', name: 'ticketCode', type: 'text' },
        ].map(({ label, name, type, options, withValidateButton, withSearchButton, readOnly }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <div className="flex items-center space-x-2">
              {type === 'select' ? (
                <select
                  id={name}
                  {...register(name)}
                  className={`mt-1 block w-full p-2 border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                >
                  <option value="">Seleccione una opción</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={name}
                  type={type}
                  {...register(name)}
                  readOnly={readOnly}
                  className={`mt-1 block w-full p-2 border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
              )}
              {withValidateButton && (
                <button
                  type="button"
                  onClick={handleValidateBonus}
                  disabled={isValidating || isBonusValid}
                  className="p-2 bg-emerald-500 mt-1 text-white hover:bg-emerald-600 disabled:bg-gray-200"
                >
                  {isValidating ? 'Validando...' : 'Validar'}
                </button>
              )}
              {withSearchButton && (
                <button
                  type="button"
                  onClick={handleSearchDNI}
                  disabled={isSearching || (name === 'documentNumber' && documentType !== 'DNI')}
                  className="p-2 bg-blue-700 text-white mt-1 hover:bg-blue-600 disabled:bg-gray-200"
                >
                  {isSearching ? 'Buscando...' : 'Buscar'}
                </button>
              )}
            </div>
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className="my-4 w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Procesando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default BonusComponent;
