import { useNavigate, useLocation } from 'react-router-dom';
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

const FormUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer } = location.state;

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

  const [citizenCardTxt, setCitizenCardTxt] = useState('');
  const [passportTxt, setPassportTxt] = useState('');
  const [familyCardTxt, setFamilyCardTxt] = useState('');
  const [photoTxt, setPhotoTxt] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isReset, setIsReset] = useState(false);

  // const onChangeDateHandler = (e : ChangeEvent<HTMLInputElement>) => {
  //   setBirthDate(e.target.value)
  // }

  // useEffect(() => {
  //   console.log(province.name, regency.name, district.name, villages.name);
  // }, [province, regency, district, villages]);
  useEffect(() => {
    console.log(genderValue);
  }, [genderValue]);

  useEffect(() => {
    axios
      .get(`/api/customers/${customer}`)
      .then((Response) => {
        console.log(Response);
        setName(Response.data.Name);
        setBirthDate(new Date(Response.data.Birthdate));
        setbirthPlace(Response.data.Birthplace);
        setPassportExp(new Date(Response.data.PassportExp));
        setGenderValue(Response.data.Gender);
        setAddress(Response.data.Address);
        setCitizenId(Response.data.CitizenID);
        setpassportId(Response.data.PassportID);
        setProvince({ id: '', name: Response.data.Province });
        setRegency({ id: '', name: Response.data.Regency, province_id: '' });
        setDistrict({ id: '', name: Response.data.District, regency_id: '' });
        setVillages({ id: '', name: Response.data.Village, district_id: '' });
        setTravelPkg(Response.data.TravelPkg);
        setRoomType(Response.data.RoomType);
        setCitizenCardTxt(Response.data.CitizenCard);
        setPassportTxt(Response.data.Passport);
        setFamilyCardTxt(Response.data.FamilyCard);
        setPhotoTxt(Response.data.Photo);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const onDeleteHandler = async () => {
    axios
      .delete(`/api/customers/${customer}`)
      .then((Response) => {
        console.log(Response);
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', customer.toString());
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
      const response = await axios.put('/api/customers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

      if (response.status === 200) {
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
      <form
        onSubmit={onSubmitHandler}
        onReset={() => setIsReset((prev) => !prev)}
      >
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
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>{name}</div>
            </div>

            <div className="mb-5.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Jenis Kelamin
              </label>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div className={!isUpdating ? 'hidden' : ''}>
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
                </div>
                <div className={isUpdating ? 'hidden' : ''}>{genderValue}</div>

                {/* <CheckboxFour text="Pria" />
                <CheckboxFour text="Wanita" /> */}
              </div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Tempat Lahir
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>{birthPlace}</div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Tanggal Lahir
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
                <DatePickerOne
                  id="birthDate"
                  onChangeHandler={(date: Date | null) => setBirthDate(date)}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>
                {birthDate?.toDateString()}
              </div>
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
              <div className={!isUpdating ? 'hidden' : ''}>
                <SelectProvince
                  onChangeHandler={(prov: { id: string; name: string }) => {
                    setProvince(prov);
                  }}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>{province.name}</div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Kabupaten/Kota
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
                <SelectRegency
                  prov_id={province.id}
                  onChangeHandler={(reg: {
                    id: string;
                    name: string;
                    province_id: string;
                  }) => setRegency(reg)}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>{regency.name}</div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Kecamatan
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
                <SelectDistrict
                  reg_id={regency.id}
                  onChangeHandler={(dis: {
                    id: string;
                    name: string;
                    regency_id: string;
                  }) => setDistrict(dis)}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>{district.name}</div>
            </div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Kelurahan/Desa
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
                <SelectVillage
                  dis_id={district.id}
                  onChangeHandler={(vil: {
                    id: string;
                    name: string;
                    district_id: string;
                  }) => setVillages(vil)}
                />
              </div>
            </div>
            <div className={isUpdating ? 'hidden' : ''}>{villages.name}</div>

            <div className="mb-4.5">
              <label className="mb-3 block text-black dark:text-white">
                Alamat
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>{address}</div>
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
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>{citizenId}</div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                No Paspor
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>{passportId}</div>
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Masa Berlaku Paspor
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
                <DatePickerOne
                  id="passportExp"
                  onChangeHandler={(date: Date | null) => setPassportExp(date)}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>
                {passportExp?.toDateString()}
              </div>
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Kartu Tanda Penduduk (KTP)
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>
                <a href={`/files/${citizenCardTxt}`}>{citizenCardTxt}</a>
              </div>
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Kartu Keluarga (KK)
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>
                <a href={`/files/${familyCardTxt}`}>{familyCardTxt}</a>
              </div>
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Paspor
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>
                <a href={`/files/${passportTxt}`}>{passportTxt}</a>
              </div>
            </div>

            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Lampiran Foto Diri
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
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
              <div className={isUpdating ? 'hidden' : ''}>
                <a href={`/files/${photoTxt}`}>{photoTxt}</a>
              </div>
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
              <div className={!isUpdating ? 'hidden' : ''}>
                <SelectGroupOne
                  onChangeHandler={(option: string) => setTravelPkg(option)}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>{travelPkg}</div>
            </div>
            <div className="mb-5.5">
              <label className="mb-3 block text-black dark:text-white">
                Tipe Kamar
              </label>
              <div className={!isUpdating ? 'hidden' : ''}>
                <OptionsWithTabs
                  onChangeHandler={(room: string) => setRoomType(room)}
                />
              </div>
              <div className={isUpdating ? 'hidden' : ''}>{roomType}</div>
            </div>
          </div>
        </div>
        <div className="mt-20 w-3/4 mx-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className={isUpdating ? 'p-6.5 flex flex-col gap-12' : 'hidden'}>
            <button
              type="reset"
              onClick={() => setIsUpdating(false)}
              className="flex w-full justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              Simpan
            </button>
          </div>

          <div
            className={!isUpdating ? 'p-6.5 flex flex-col gap-12' : 'hidden'}
          >
            <button
              type="button"
              onClick={() => setIsUpdating(true)}
              className="flex w-full justify-center rounded bg-yellow-600 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              ❕Edit
            </button>
            <button
              type="button"
              onClick={() => onDeleteHandler()}
              className="flex w-full justify-center rounded bg-red-800 p-3 font-medium text-gray hover:bg-opacity-90"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormUpdate;
