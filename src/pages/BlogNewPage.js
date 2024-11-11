import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import { useNavigate } from 'react-router-dom';

function BlogNewPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    markdown: '',
    file: null,
    imagePath: "",
    sections: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleAddSection = (type) => {
    setFormData((prevState) => ({
      ...prevState,
      sections: [
        ...prevState.sections,
        { type, content: '', order: prevState.sections.length + 1 },
      ],
    }));
  };

  const handleSectionChange = (index, value) => {
    const updatedSections = [...formData.sections];
    if (updatedSections[index].type === 'image') {
      updatedSections[index].content = value.target.files[0];
    } else {
      updatedSections[index].content = value.target.value;
    }
    setFormData({ ...formData, sections: updatedSections });
  };
  

  const handleRemoveSection = (index) => {
    const updatedSections = formData.sections.filter((_, i) => i !== index);
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('markdown', formData.markdown);
  
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }
  
    formData.sections.forEach((section, index) => {
      formDataToSend.append(`sections[${index}][type]`, section.type);
      if (section.type === 'image' && section.content instanceof File) {
        formDataToSend.append(`sections`, section.content);
      } else {
        formDataToSend.append(`sections[${index}][content]`, section.content);
      }
      formDataToSend.append(`sections[${index}][order]`, section.order);
    });
  
    fetch('/api/blogs', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (response.ok) {
          navigate('/blog');
        } else {
          console.error('Failed to create new blog');
        }
      })
      .catch((error) => console.error('Error:', error));
  };
  

  return (
    <MainLayout>
      <h1 className="mb-10">New Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="markdown">Markdown</label>
          <textarea
            required
            name="markdown"
            id="markdown"
            className="form-control"
            value={formData.markdown}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Main Image</label>
          <input
            type="file"
            name="imagePath"
            id="imagePath"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div>

        {/* Sekcije */}
        <h3>Sections</h3>
        {formData.sections.map((section, index) => (
          <div key={index} className="section">
          <label>Section {index + 1}</label>
          {section.type === 'text' ? (
            <textarea
              className="form-control"
              value={section.content}
              onChange={(e) => handleSectionChange(index, e)}
            />
          ) : (
            <input
              type="file"
              className="form-control-file"
              onChange={(e) => handleSectionChange(index, e)}
            />
          )}
          <button
            type="button"
            onClick={() => handleRemoveSection(index)}
            className="btn btn-danger mt-2"
          >
            Remove Section
          </button>
        </div>
        
        ))}

        <button type="button" onClick={() => handleAddSection('text')} className="btn btn-secondary mt-3">
          Add Text Section
        </button>
        <button type="button" onClick={() => handleAddSection('image')} className="btn btn-secondary mt-3">
          Add Image Section
        </button>

        <button type="button" onClick={() => navigate('/blog')} className="btn btn-secondary mt-3">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mt-3">Save</button>
      </form>
    </MainLayout>
  );
}

export default BlogNewPage;
