import 'react-quill/dist/quill.snow.css';

import * as yup from 'yup';

import { Col, Row, Typography } from 'antd';
import { IImage, IProduct } from '../../../interfaces/product';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { IBrand } from '../../../interfaces/brands';
import { ISpecification } from '../../../interfaces/specification';
import { LoadingOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { createProduct } from '../../../api/products';
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
  description: yup.string().required('Vui lòng nhập mô tả sản phẩm'),
  images: yup.mixed().test('required', 'You need to provide a file', (file) => {
    if (file) return true;
    return false;
  }),
  brand: yup.string().required('Vui lòng chọn thương hiệu'),
  specifications: yup.string().required('Vui lòng chọn thông số kỹ thuật'),
});

type FormData = yup.InferType<typeof productSchema>;

const ProductsAdd = () => {
  const naviaget = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(productSchema),
    mode: 'onSubmit',
  });

  /* validate react quill */
  const editorContent = watch('description');
  useEffect(() => {
    register('description', { required: true, minLength: 11 });
  }, [register]);
  const onEditorStateChange = (editorState: any) => {
    setValue('description', editorState);
  };
  const uploadImages = async (files: any) => {
    const folder_name = 'assignment5';
    const preset_name = 'assignment5';
    const cloud_name = 'dcwdrvxdg';
    const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
    const formData = new FormData();
    formData.append('folder', folder_name);
    formData.append('upload_preset', preset_name);
    // const api = 'https://api.imgbb.com/1/upload?key=87c6dbc457af9764143a48715ccc1fc7';
    const urls = [];
    for (const file of files) {
      formData.append('file', file);
      const response = await axios.post(api, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      if (response && response.data) {
        console.log('🚀 ~ file: ProductsAdd.tsx:86 ~ uploadImages ~ response:', response);
        // const url: IImage = {
        //   base_url: response.data.data.display_url,
        //   medium_url: response.data.data.medium.url,
        //   thumb_url: response.data.data.thumb.url,
        //   url: response.data.data.url,
        //   url_viewer: response.data.data.url_viewer,
        // };
        // urls.push(url);
      }
    }
    // return urls;
  };
  /* submit form */
  const onSubmit = async (data: FormData) => {
    try {
      const files = await uploadImages(data.images);
      console.log('🚀 ~ file: ProductsAdd.tsx:72 ~ onSubmit ~ files:', files);
      // if (files.length === 0) {
      //   toast.error('Lỗi khi upload ảnh');
      //   return;
      // }
      const product: any = {
        ...data,
        images: files,
      };
      const response = await createProduct(product);
      console.log('🚀 ~ file: ProductsAdd.tsx:105 ~ onSubmit ~ response:', response);
      if (response && response.data) {
        toast.success('Thêm sản phẩm thành công');
        naviaget('/admin/mobile');
      }
    } catch (error) {
      toast.error('Lỗi khi thêm sản phẩm');
    }
  };
  /* useState */
  const [specifications, setSpecifications] = useState<ISpecification[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);

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
  return (
    <Row>
      <Col span={24}>
        <div className="flex items-center justify-between">
          <Typography.Title level={3}>Thêm sản phẩm</Typography.Title>
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
            <div className="group relative z-0 w-full mb-6">
              <div>
                <label
                  className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="file_input"
                >
                  Upload file
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
              <ReactQuill theme="snow" value={editorContent} onChange={onEditorStateChange} />
              {errors.description && (
                <span className="text-primary text-xs">{errors.description.message}</span>
              )}
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="text-white flex justify-center items-center !w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isSubmitting ? <LoadingOutlined /> : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default ProductsAdd;
