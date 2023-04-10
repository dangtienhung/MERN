import 'react-quill/dist/quill.snow.css';

import * as yup from 'yup';

import { Col, Row, Spin, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../../../api/products';

import { IBrand } from '../../../interfaces/brands';
import { IProduct } from '../../../interfaces/product';
import { ISpecification } from '../../../interfaces/specification';
import { LoadingOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { getAllBrands } from '../../../api/brands';
import { getAllSpecifications } from '../../../api/specification';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const productSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên sản phẩm'),
  price: yup
    .number()
    .required('Vui lòng nhập giá sản phẩm')
    .min(0, 'Giá sản phẩm không được nhỏ hơn 0')
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(),
  original_price: yup
    .number()
    .required('Vui lòng nhập giá gốc sản phẩm')
    .min(0, 'Giá gốc sản phẩm không được nhỏ hơn 0')
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(),
  images: yup.mixed().test('required', 'You need to provide a file', (file) => {
    if (file) return true;
    return false;
  }),
  brand: yup.string().required('Vui lòng chọn thương hiệu'),
  specifications: yup.string().required('Vui lòng chọn thông số kỹ thuật'),
});

type FormData = yup.InferType<typeof productSchema>;
const ProductsEdit = () => {
  /* react hook form */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(productSchema),
    mode: 'onSubmit',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  /* useState */
  const [product, setProduct] = useState<IProduct>();
  const [specifications, setSpecifications] = useState<ISpecification[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [value, setValue] = useState<string>('');
  /* get data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBrand = await getAllBrands();
        const responseSpecification = await getAllSpecifications();
        if (responseBrand && responseSpecification) {
          setBrands(responseBrand.data.brands);
          setSpecifications(responseSpecification.data);
        }
      } catch (error) {
        toast.error('Lỗi khi lấy dữ liệu');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!product) return;
    setValue(product.description);
  }, [product?.description]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const response = await getProductById(id);
        if (!response) {
          toast.error('Sản phẩm không tồn tại');
          navigate('/admin/mobile');
          return;
        }
        const { product } = response.data;
        setProduct(product);
      } catch (error) {
        toast.error('Sản phẩm không tồn tại');
        navigate('/admin/mobile');
      }
    };
    fetchData();
  }, []);

  if (!product)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  const uploadImages = async (files: any) => {
    const formData = new FormData();
    const folder_name = 'assignment5';
    const preset_name = 'assignment5';
    const cloud_name = 'dcwdrvxdg';
    const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    formData.append('folder', folder_name);
    formData.append('upload_preset', preset_name);
    const urls = [];
    for (const file of files) {
      formData.append('file', file);
      const response = await axios.post(api, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      if (response && response.data) {
        urls.push(response.data.url);
      }
    }
    return urls;
  };

  /* handle submit form */
  const onSubmit = async (data: any) => {
    try {
      if (!id) return;
      const images = data.images;
      let urls = [];
      if (images.length > 0) {
        urls = await uploadImages(images);
      } else {
        urls = product.images;
      }
      const values = { ...data, images: urls, description: value };
      const response = await updateProduct(id, values);
      if (response && response.data) {
        toast.success('Sửa sản phẩm thành công');
        navigate('/admin/mobile');
      }
    } catch (error) {
      toast.error('Lỗi khi sửa sản phẩm');
    }
  };
  return (
    <Row>
      <Col span={24}>
        <div className="flex items-center justify-between">
          <Typography.Title level={3}>Sửa sản phẩm</Typography.Title>
          <Link to="/admin/mobile">Quay lại</Link>
        </div>
      </Col>
      <Col span={24}>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:grid-cols-2 md:gap-6 grid">
            <div className="group relative z-0 w-full mb-6">
              <input
                type="text"
                {...register('name')}
                id="name"
                defaultValue={product.name}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tên sản phẩm
              </label>
              {errors.name && <span className="text-primary text-xs">{errors.name.message}</span>}
            </div>
            <div className="group relative z-0 w-full mb-6">
              <input
                type="number"
                {...register('price')}
                id="price"
                defaultValue={product.price}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="price"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Giá khuyến mại
              </label>
              {errors.price && <span className="text-primary text-xs">{errors.price.message}</span>}
            </div>
            <div className="group relative z-0 w-full mb-6">
              <input
                type="number"
                {...register('original_price')}
                id="price_origin"
                defaultValue={product.original_price}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="price_origin"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Giá gốc
              </label>
              {errors.original_price && (
                <span className="text-primary text-xs">{errors.original_price.message}</span>
              )}
            </div>
            <div className="group relative z-0 w-full mb-6">
              <select
                {...register('brand')}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                {brands.map((brand: IBrand) => (
                  <option value={brand._id} key={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brand && <span className="text-primary text-xs">{errors.brand.message}</span>}
            </div>
            <div className="group relative z-0 w-full mb-6">
              <select
                {...register('specifications')}
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              >
                {specifications.map((specification: ISpecification) => (
                  <option value={specification._id} key={specification._id}>
                    {specification.name}
                  </option>
                ))}
              </select>
              {errors.brand && <span className="text-primary text-xs">{errors.brand.message}</span>}
            </div>
          </div>

          <div className="md:grid-cols-1 md:gap-6 grid">
            <h3>Giữ lại ảnh cũ</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string) => (
                <figure key={image} className="max-w-lg">
                  <img
                    className="h-[200px] max-w-full rounded-lg"
                    src={image}
                    alt="image description"
                  />
                </figure>
              ))}
            </div>
            <div className="group relative z-0 w-full mb-6">
              <div>
                <label
                  className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file_input"
                >
                  Hoăc thay ảnh mới
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  {...register('images')}
                  className="bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              {errors.images && (
                <span className="text-primary text-xs">{errors.images.message}</span>
              )}
            </div>
          </div>
          <div className="md:grid-cols-1 md:gap-6 grid">
            <div className="group relative z-0 w-full mb-6">
              <h3>Mô tả sản phẩm</h3>
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="text-white flex justify-center items-center !w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSubmitting ? <LoadingOutlined /> : 'Sửa sản phẩm'}
            </button>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default ProductsEdit;
