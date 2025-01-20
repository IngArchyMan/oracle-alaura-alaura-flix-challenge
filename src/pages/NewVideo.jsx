import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const NewVideo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    imagen: "",
    video: "",
    descripcion: "",
  });

  // Estado para mensajes de retroalimentación
  const [feedback, setFeedback] = useState({
    type: '', // 'success' o 'error'
    message: ''
  });

  // Validaciones
  const validateField = (name, value) => {
    switch (name) {
      case 'titulo':
        return value.length < 3 ? 'El título debe tener al menos 3 caracteres' : '';
      case 'categoria':
        return value === '' ? 'Debe seleccionar una categoría' : '';
      case 'imagen':
        return !isValidUrl(value) ? 'Debe ser una URL válida' : '';
      case 'video':
        return !isValidUrl(value) ? 'Debe ser una URL válida' : '';
      case 'descripcion':
        return value.length < 10 ? 'La descripción debe tener al menos 10 caracteres' : '';
      default:
        return '';
    }
  };

  // Función auxiliar para validar URLs
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validación en tiempo real
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Limpiar formulario
  const handleClear = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
      setFormData({
        titulo: "",
        categoria: "",
        imagen: "",
        video: "",
        descripcion: "",
      });
      setErrors({});
      setFeedback({ type: '', message: '' });
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar antes de enviar
    if (!validateForm()) {
      setFeedback({
        type: 'error',
        message: 'Por favor, corrija los errores antes de continuar'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createVideo(formData);
      setFeedback({
        type: 'success',
        message: 'Video creado exitosamente'
      });
      
      // Redirigir después de un breve delay para mostrar el mensaje de éxito
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      console.error("Error creating video:", error);
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Error al crear el video. Por favor, intente nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente para mostrar errores
  const ErrorMessage = ({ error }) => (
    error ? <span className="text-red-500 text-sm mt-1">{error}</span> : null
  );

  // Componente para retroalimentación
  const FeedbackMessage = () => (
    feedback.message ? (
      <div className={`mt-4 p-4 rounded ${
        feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {feedback.message}
      </div>
    ) : null
  );

  return (
    <div className="main-content tg-on-surface-text">
      <div className="wrapper-content flex-c-s-c">
        <h1 className="display-medium title-page">Nuevo Video</h1>
        <p className="aux-title-text">
          Complete el formulario para crear una nueva tarjeta de video
        </p>
        <div className="new-target-form-container">
          <div className="form-header tg-primary-border">
            <div className="header-content">
              <h2 className="display-small">Crear Tarjeta</h2>
            </div>
          </div>
          <div className="form-body">
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-wrapper flex-c-c-c">
                <div className="form-row flex-r-s-c">
                  <div className="form-group flex-c-c-s">
                    <label htmlFor="titulo">Título</label>
                    <input
                      id="titulo"
                      name="titulo"
                      required
                      type="text"
                      value={formData.titulo}
                      onChange={handleChange}
                      className={`tg-on-primary-border ${
                        errors.titulo ? 'border-red-500' : ''
                      }`}
                      placeholder="Ingrese el título"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage error={errors.titulo} />
                  </div>
                  
                  <div className="form-group flex-c-c-s">
                    <label htmlFor="categoria">Categoría</label>
                    <select
                      id="categoria"
                      name="categoria"
                      required
                      value={formData.categoria}
                      onChange={handleChange}
                      className={`tg-on-primary-border ${
                        errors.categoria ? 'border-red-500' : ''
                      }`}
                      disabled={isSubmitting}
                    >
                      <option value="">Seleccione una categoría</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="innovacion">Innovación y Gestión</option>
                    </select>
                    <ErrorMessage error={errors.categoria} />
                  </div>
                </div>

                <div className="form-row flex-r-c-c">
                  <div className="form-group flex-c-c-s">
                    <label htmlFor="imagen">Imagen URL</label>
                    <input
                      id="imagen"
                      name="imagen"
                      required
                      type="url"
                      value={formData.imagen}
                      onChange={handleChange}
                      className={`tg-on-primary-border ${
                        errors.imagen ? 'border-red-500' : ''
                      }`}
                      placeholder="https://"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage error={errors.imagen} />
                  </div>

                  <div className="form-group flex-c-c-s">
                    <label htmlFor="video">Video URL</label>
                    <input
                      id="video"
                      name="video"
                      required
                      type="url"
                      value={formData.video}
                      onChange={handleChange}
                      className={`tg-on-primary-border ${
                        errors.video ? 'border-red-500' : ''
                      }`}
                      placeholder="https://"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage error={errors.video} />
                  </div>
                </div>

                <div className="form-row flex-r-s-c">
                  <div className="form-group flex-c-s-s">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      required
                      value={formData.descripcion}
                      onChange={handleChange}
                      className={`tg-on-primary-border ${
                        errors.descripcion ? 'border-red-500' : ''
                      }`}
                      rows="4"
                      placeholder="¿De qué se trata este video?"
                      disabled={isSubmitting}
                    />
                    <ErrorMessage error={errors.descripcion} />
                  </div>
                </div>

                <FeedbackMessage />

                <div className="form-row flex-r-s-c">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="tg-primary-border tg-primary-container tg-primary-text"
                    disabled={isSubmitting}
                  >
                    Limpiar
                  </button>
                  <button
                    type="submit"
                    className="tg-on-primary-text tg-primary-border"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVideo;