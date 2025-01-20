import React, { useState, useEffect } from "react";

const VideoModal = ({ video, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    imagen: "",
    video: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (video) {
      setFormData(video);
      setErrors({});
      setIsDirty(false);
    }
  }, [video]);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    } else if (formData.titulo.length < 3) {
      newErrors.titulo = "El título debe tener al menos 3 caracteres";
    }

    if (!formData.categoria) {
      newErrors.categoria = "Selecciona una categoría";
    }

    if (!formData.imagen) {
      newErrors.imagen = "La URL de la imagen es obligatoria";
    } else if (!validateUrl(formData.imagen)) {
      newErrors.imagen = "URL de imagen inválida";
    }

    if (!formData.video) {
      newErrors.video = "La URL del video es obligatoria";
    } else if (!validateUrl(formData.video)) {
      newErrors.video = "URL de video inválida";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (formData.descripcion.length < 10) {
      newErrors.descripcion = "La descripción debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsDirty(true);
    
    // Validación en tiempo real
    if (isDirty) {
      const fieldError = {};
      switch (name) {
        case 'titulo':
          if (!value.trim()) fieldError[name] = "El título es obligatorio";
          else if (value.length < 3) fieldError[name] = "El título debe tener al menos 3 caracteres";
          break;
        case 'imagen':
        case 'video':
          if (!value) fieldError[name] = `La URL ${name === 'imagen' ? 'de la imagen' : 'del video'} es obligatoria`;
          else if (!validateUrl(value)) fieldError[name] = `URL ${name === 'imagen' ? 'de imagen' : 'de video'} inválida`;
          break;
        case 'descripcion':
          if (!value.trim()) fieldError[name] = "La descripción es obligatoria";
          else if (value.length < 10) fieldError[name] = "La descripción debe tener al menos 10 caracteres";
          break;
      }
      setErrors(prev => ({
        ...prev,
        [name]: fieldError[name] || undefined
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-video-edit">
      <div className="modal-container tg-surface-container-low tg-primary-border">
        <div className="modal-wrapper flex-c-s-c">
          <div className="modal-title flex-r-b-c">
            <h2 className="display-small tg-primary-text">Editar Video</h2>
            <div className="icon-close">
              <button
                onClick={onClose}
                className="close-button tg-on-surface-text"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="24"
                  height="24"
                  strokeWidth="1.25"
                >
                  <path d="M10 10l4 4m0 -4l-4 4"></path>
                  <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-container flex-c-c-c">
                <div className="form-group flex-c-c-s">
                  <label htmlFor="titulo">Título</label>
                  <input
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder={formData.titulo}
                    onChange={handleChange}
                    className={`tg-surface-container-high tg-primary-border tg-primary-text ${
                      errors.titulo ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.titulo && (
                    <span className="text-red-500 text-sm mt-1">{errors.titulo}</span>
                  )}
                </div>

                <div className="form-group flex-c-c-s">
                  <label htmlFor="categoria">Categoría</label>
                  <select
                    id="categoria"
                    name="categoria"
                    placeholder={formData.categoria}
                    onChange={handleChange}
                    className={`tg-surface-container-high tg-primary-border tg-primary-text ${
                      errors.categoria ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="innovacion">Innovación y Gestión</option>
                  </select>
                  {errors.categoria && (
                    <span className="text-red-500 text-sm mt-1">{errors.categoria}</span>
                  )}
                </div>

                <div className="form-group flex-c-c-s">
                  <label htmlFor="imagen">Imagen URL</label>
                  <input
                    id="imagen"
                    name="imagen"
                    type="url"
                    placeholder={formData.imagen}
                    onChange={handleChange}
                    className={`tg-surface-container-high tg-primary-border tg-primary-text ${
                      errors.imagen ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.imagen && (
                    <span className="text-red-500 text-sm mt-1">{errors.imagen}</span>
                  )}
                </div>

                <div className="form-group flex-c-c-s">
                  <label htmlFor="video">Video URL</label>
                  <input
                    id="video"
                    name="video"
                    type="url"
                    placeholder={formData.video}
                    onChange={handleChange}
                    className={`tg-surface-container-high tg-primary-border tg-primary-text ${
                      errors.video ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.video && (
                    <span className="text-red-500 text-sm mt-1">{errors.video}</span>
                  )}
                </div>

                <div className="form-group flex-c-c-s">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder={formData.descripcion}
                    onChange={handleChange}
                    className={`tg-surface-container-high tg-primary-border tg-primary-text ${
                      errors.descripcion ? 'border-red-500' : ''
                    }`}
                    rows="3"
                  />
                  {errors.descripcion && (
                    <span className="text-red-500 text-sm mt-1">{errors.descripcion}</span>
                  )}
                </div>

                <div className="form-actions flex-r-b-c">
                  <button
                    type="button"
                    onClick={onClose}
                    className="tg-primary-border tg-primary-container tg-on-primary-container-text"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="tg-primary-border tg-primary-text tg-surface-container-high"
                  >
                    Guardar
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

export default VideoModal;