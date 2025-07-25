import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id?: number;
  name: string;
  description: string;
}

const CategoryCreate: React.FC = () => {
  const [category, setCategory] = useState<Category>({
    name: '',
    description: ''
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category.name.trim()) {
      setError('Tên danh mục không được để trống');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });
      
      if (response.ok) {
        // Chuyển hướng về trang danh sách danh mục sau khi thêm thành công
        navigate('/categories');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add category');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi thêm danh mục');
      console.error('Error adding category:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thêm Danh Mục Mới</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Tên danh mục <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập tên danh mục"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập mô tả danh mục"
          />
        </div>
        
        <div className="flex items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm Danh Mục
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/categories')}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryCreate;