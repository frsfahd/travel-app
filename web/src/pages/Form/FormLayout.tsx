import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import RadioButton from '../../components/RadioButton';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import OptionsWithTabs from '../../components/Forms/OptionsWithTabs';
import SelectProvince from '../../components/Forms/SelectGroup/SelectProvince';
import SelectRegency from '../../components/Forms/SelectGroup/SelectRegency';
import SelectDistrict from '../../components/Forms/SelectGroup/SelectDistrict';
import SelectVillage from '../../components/Forms/SelectGroup/SelectVillage';

const FormLayout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthPlace, setbirthPlace] = useState('');
  const [address, setAddress] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [citizenId, setCitizenId] = useState('');
  const [passportId, setpassportId] = useState('');
  const [passportExp, setPassportExp] = useState<Date | null>(null);
  const [roomType, setRoomType] = useState('');
  const [travelPkg, setTravelPkg] = useState('');

  const [province, setProvince] = useState<{ id: string; name: string }>({
    id: '',
    name: '',
  });
  const [regency, setRegency] = useState<{
    id: string;
    name: string;
    province_id: string;
  }>({
    id: '',
    name: '',
    province_id: '',
  });
  const [district, setDistrict] = useState<{
    id: string;
    name: string;
    regency_id: string;
  }>({
    id: '',
    name: '',
    regency_id: '',
  });
  const [villages, setVillages] = useState<{
    id: string;
    name: string;
    district_id: string;
  }>({
    id: '',
    name: '',
    district_id: '',
  });

  const [citizenCard, setCitizenCard] = useState<File | null>(null);
  const [passport, setPassport] = useState<File | null>(null);
  const [familyCard, setFamilyCard] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);

  // const onChangeDateHandler = (e : ChangeEvent<HTMLInputElement>) => {
  //   setBirthDate(e.target.value)
  // }

  // useEffect(() => {
  //   console.log(province.name, regency.name, district.name, villages.name);
  // }, [province, regency, district, villages]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', genderValue);

    formData.append('birthPlace', birthPlace);
    if (birthDate) {
      formData.append('birthDate', birthDate.toISOString());
    }
    formData.append('citizenId', citizenId);
    formData.append('passportId', passportId);
    if (passportExp) {
      formData.append('passportExp', passportExp.toISOString());
    }
    formData.append('address', address);
    formData.append('travelPkg', travelPkg);
    formData.append('roomType', roomType);
    formData.append('province', province.name);
    formData.append('regency', regency.name);
    formData.append('district', district.name);
    formData.append('village', villages.name);
    if (citizenCard) {
      formData.append('citizenCard', citizenCard);
    }
    if (passport) {
      formData.append('passport', passport);
    }
    if (familyCard) {
      formData.append('familyCard', familyCard);
    }
    if (photo) {
      formData.append('photo', photo);
    }
    try {
      const response = await axios.post('/api/customers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('File uploaded successfully');
        navigate('/');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Data Jama'ah" />

      {/* <!-- Sign Up Form --> */}
      <form onSubmit={onSubmitHandler}>
        <div className="w-3/4 mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Data Diri
            </h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Nama Lengkap
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                placeholder="Masukkan nama lengkap"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Jenis Kelamin
              </label>
              <div className="flex flex-col gap-5.5 p-6.5">
                <RadioButton
                  text={'Pria'}
                  name={'gender'}
                  selectedValue={genderValue}
                  onGenderChange={() => setGenderValue('Pria')}
                />
                <RadioButton
                  text={'Wanita'}
                  name={'gender'}
                  selectedValue={genderValue}
                  onGenderChange={() => setGenderValue('Wanita')}
                />
                {/* <CheckboxFour text="Pria" />
                <CheckboxFour text="Wanita" /> */}
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Tempat Lahir
              </label>
              <input
                required
                type="text"
                value={birthPlace}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setbirthPlace(e.target.value)
                }
                placeholder="Masukkan tempat lahir"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Tanggal Lahir
              </label>
              <DatePickerOne
                id="birthDate"
                onChangeHandler={(date: Date | null) => setBirthDate(date)}
              />
            </div>
          </div>
        </div>

        <div className="mt-20 w-3/4 mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Tempat Tinggal
            </h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Provinsi
              </label>
              <SelectProvince
                onChangeHandler={(prov: { id: string; name: string }) => {
                  setProvince(prov);
                }}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Kabupaten/Kota
              </label>
              <SelectRegency
                prov_id={province.id}
                onChangeHandler={(reg: {
                  id: string;
                  name: string;
                  province_id: string;
                }) => setRegency(reg)}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Kecamatan
              </label>
              <SelectDistrict
                reg_id={regency.id}
                onChangeHandler={(dis: {
                  id: string;
                  name: string;
                  regency_id: string;
                }) => setDistrict(dis)}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Kelurahan/Desa
              </label>
              <SelectVillage
                dis_id={district.id}
                onChangeHandler={(vil: {
                  id: string;
                  name: string;
                  district_id: string;
                }) => setVillages(vil)}
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Alamat
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setAddress(e.target.value)
                }
                placeholder="Masukkan alamat"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mt-20 w-3/4 mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Dokumen</h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                NIK
              </label>
              <input
                required
                type="text"
                value={citizenId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCitizenId(e.target.value)
                }
                placeholder="Masukkan NIK"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                No Paspor
              </label>
              <input
                required
                type="text"
                value={passportId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setpassportId(e.target.value)
                }
                placeholder="Masukkan nomor paspor"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Masa Berlaku Paspor
              </label>
              <DatePickerOne
                id="passportExp"
                onChangeHandler={(date: Date | null) => setPassportExp(date)}
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Kartu Tanda Penduduk (KTP)
              </label>
              <input
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setCitizenCard(event.target.files[0]);
                  }
                }}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Kartu Keluarga (KK)
              </label>
              <input
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setFamilyCard(event.target.files[0]);
                  }
                }}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Paspor
              </label>
              <input
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setPassport(event.target.files[0]);
                  }
                }}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Foto Diri
              </label>
              <input
                type="file"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    setPhoto(event.target.files[0]);
                  }
                }}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 w-3/4 mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Data Perjalanan
            </h3>
          </div>
          <div className="p-6.5">
            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Paket Perjalanan
              </label>
              <SelectGroupOne
                onChangeHandler={(option: string) => setTravelPkg(option)}
              />
            </div>
            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Tipe Kamar
              </label>
              <OptionsWithTabs
                onChangeHandler={(room: string) => setRoomType(room)}
              />
            </div>
          </div>
        </div>
        <div className="mt-20 w-3/4 mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormLayout;
