import React, {useState} from 'react';
import {useFormik} from "formik";
import {newMessage} from "../../../redux/reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import axios from "axios";
import {RootState} from "../../../redux/reducers/rootReducer";
import {reAuth} from "../../../redux/actions/auth";


interface Values {
  name: string;
  surname: string;
  carMake: string;
  haveWifi: boolean;
  v220: boolean
  tv: boolean
  files: File[] | []
  avatar: File | null
  carColor: string
  transporter: string
  number: string
}

const DriverForm = () => {


  const [loadImage, setLoadImage] = useState<any[]>([])
  const [avatar, setAvatar] = useState<any>(null)
  const [error, setError] = useState<any>("")
  const dispatch = useDispatch()


  const {id}: any = useSelector<RootState>(state => ({
    id: state.auth.currentUser.id,
  }))


  const validate = (values: Values) => {
    const errors: any = {

    }

    if (!values.name) {
      errors.name = 'Обязательное поле!';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }


    if (!values.surname) {
      errors.surname = 'Обязательное поле!';
    } else if (values.surname.length > 20) {
      errors.surname = 'Must be 20 characters or less';
    }

    if (!values.carMake) {
      errors.carMake = 'Обязательное поле!';
    } else if (values.carMake.length > 20) {
      errors.carMake = 'Must be 20 characters or less';
    }
    if (!values.avatar?.type.includes("image")) {
      errors.avatar = "Выберите себе аватар!!!"
    }

    // if (!values.carColor) {
    //   errors.carMake = 'Обязательно для заполнения!';
    // }
    if (!values.carColor) {
      errors.carColor = 'Обязательное поле!';
    }
    if (!values.transporter) {
      errors.transporter = 'Обязательное поле!';
    }
    if (!values.number) {
      errors.number = 'Обязательное поле!';
    }
    // if (!values.files[0]?.type.includes("image")) {
    //   errors.avatar = "Выберите себе аватар"
    // }
    if (!(values.files.length > 2)) {
      errors.files = "Фото должно быть не меньше 3-х"
    }
    console.log(errors)
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      carMake: '',
      haveWifi: false,
      v220: false,
      tv: false,
      carColor: '',
      transporter: '',
      number: '',
      files: [],
      avatar: null
    },
    onSubmit: (values: Values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log('error')
      // console.log(typeof values.avatar)
      //
      // console.log(values.avatar instanceof File)
      axios.post("http://localhost:5002/api/taxi/infofill", {
        id, name: values.name,
        surname: values.surname,
        carMake: values.carMake,
        haveWifi: values.haveWifi,
        v220: values.v220,
        tv: values.tv,
        carColor: values.carColor,
        transporter: values.transporter,
        number: values.number
      })
        .then((resp) => {
          const data = new FormData()
          if (values.avatar) data.append("avatar", values.avatar)
          axios.post("http://localhost:5002/api/taxi/addavatar", data, {params: {id}})
            .then((resp) => {
              const data = new FormData()
              console.log(values.files)
              const photo = [...values.files]
              photo.forEach(file => {
                data.append("file", file)
              })
              axios.post("http://localhost:5002/api/taxi/addcarphoto", data, {params: {id}})
                .then((resp) => {
                  dispatch(reAuth())
                  console.log(resp)
                })
            })
          console.log(resp)
        })
        .catch((e) => console.log(e))
      console.log(values)
    },
    validate
  });

  function onInputFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target: any = e.target
    console.log(e)
    if (target.files[0].type.includes("image")) {
      setError("")
      setLoadImage([...target.files])
      console.log(loadImage)
    } else {
      setError("Не правильный формат файла")
      dispatch(newMessage("Неправильный формат файла"))
    }
  }

  console.log(formik)


  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={"form"}>
        <h2>Заполните информацию для завершения регистрации</h2>
        <h3>Персоналльные данные</h3>
        <div style={{display: "flex"}}>
          <div className={"form__field"}>
            <label htmlFor="name" className={"label"}>Имя</label>
            <input
              type="text"
              id={"name"}
              name={"name"}
              className={classNames("form__field-input input", {"error": formik.errors.name && formik.touched.name})}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div className={"form__field-error"}>{formik.errors.name}</div> : null}
          </div>

          <div className={"form__field"}>
            <label htmlFor="surname" className={"label"}>Фамилия</label>
            <input
              type="text"
              id={"surname"}
              className={classNames("form__field-input input", {"error": formik.errors.surname && formik.touched.surname})}
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.surname && formik.touched.surname ? <div className={"form__field-error"}>{formik.errors.surname}</div> : null}
          </div>
        </div>
        <input
          id={"input__avatar"}
          className={"input__avatar"}
          type="file"
          accept="image/*"
          onChange={(e: any) => formik.setFieldValue("avatar", e.target.files[0])}
          onBlur={formik.handleBlur}
        />

        {formik.values.avatar ?
          <img className={"modal__preview_image"} src={URL.createObjectURL(formik.values.avatar)} alt="avatar"/>
          :
          <div className={classNames("image-skeleton", {"error": formik.errors.avatar && formik.touched.avatar})}>
            {formik.errors.avatar && formik.touched.avatar ? formik.errors.avatar :  "Здесь будет ваше фото"}
          </div>
        }
        <label htmlFor={"input__avatar"} className={"input__label"}><img src="https://img.icons8.com/fluency-systems-regular/25/000000/add-image.png"/> Выбрать фото</label>

        <h2>Информация о вашем транспортном средстве</h2>
        <div style={{display: "flex"}}>
          <div className={"form__field"}>
          <label htmlFor="carMake" className={"label"}>Марка автомобиля</label>
            <input
              type="text"
              id={"carMake"}
              className={classNames("form__field-input input", {"error": formik.errors.carMake && formik.touched.carMake})}
              value={formik.values.carMake}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
            {formik.errors.carMake && formik.touched.carMake ? <div className={"form__field-error"} >{formik.errors.carMake}</div> : null}
          </div>

          <div className={"form__field"}>
            <label htmlFor="carColor" className={"label"}>Цвет машины</label>
            <input
              type="text"
              id={"carColor"}
              className={classNames("form__field-input input", {"error": formik.errors.carColor && formik.touched.carColor})}
              value={formik.values.carColor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.carColor && formik.touched.carColor ? <div className={"form__field-error"} >{formik.errors.carColor}</div> : null}
          </div>
        </div>

        <div style={{display: "flex"}}>
          <div className={"form__field"}>
            <label htmlFor="transporter" className={"label"}>Перевозчик</label>
            <input
              type="text"
              id={"transporter"}
              className={classNames("form__field-input input", {"error": formik.errors.transporter && formik.touched.transporter})}
              value={formik.values.transporter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.transporter && formik.touched.transporter ? <div className={"form__field-error"} >{formik.errors.transporter}</div> : null}
          </div>

          <div className={"form__field"}>
            <label htmlFor="number" className={"label"}>Государственный номер</label>
            <input
              type="text"
              id={"number"}
              className={classNames("form__field-input input", {"error": formik.errors.number && formik.touched.number})}
              value={formik.values.number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.number && formik.touched.number ? <div className={"form__field-error"} >{formik.errors.number}</div> : null}
          </div>
        </div>

        <h4>Отметьте наличие</h4>
        <div className={"form__checkboxes"}>
          <div className={"form__checkboxes_field"}>
            <label htmlFor="haveWifi" className={"form__checkboxes_field-label"}>Наличие Wifi</label>
            <input
              id={"haveWifi"}
              type="checkbox"
              checked={formik.values.haveWifi}
              onChange={formik.handleChange}
            />
          </div>

          <div  className={"form__checkboxes_field"}>
            <label htmlFor="220v" className={"form__checkboxes_field-label"}>Розетка 220В</label>
            <input
              id={"v220"}
              type="checkbox"
              checked={formik.values.v220}
              onChange={formik.handleChange}
            />
          </div>

          <div  className={"form__checkboxes_field"}>
            <label htmlFor="tv" className={"form__checkboxes_field-label"}>Теливизор</label>
            <input
              id={"tv"}
              type="checkbox"
              checked={formik.values.tv}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <h2>Фотографии вашего транспортного средства</h2>
        {/*<input type="file"  accept="image/*" multiple onChange={(e) => onInputFileHandler(e)} />*/}

        <label htmlFor={"input__files"} className={"input__label"}><img src="https://img.icons8.com/fluency-systems-regular/25/000000/add-image.png"/> Выбрать фотографии авто</label>
        <input id={"input__files"} type="file" className={"input__file"}  accept="image/*" multiple onChange={(e) => formik.setFieldValue("files", e.target.files)} />

        {formik.values.files.length ? <>
          <div className={"form__images"}>
            {[...formik.values.files].map((file: any) => (
                <img className="form__load-image" src={URL.createObjectURL(file)} alt="loadImage"/>
              )
            )}
          </div>
        </>
          :
          <div className={classNames("files__skeleton", {error: formik.errors.files && formik.touched.files})}>
            {formik.errors.files && formik.touched.files ? formik.errors.files : "Здесь будут фото вашего авто"}
          </div>
        }

        <button className={"form__submit-button"} type={"submit"}>Подтвердить</button>
      </form>
    </div>
  );
};

export default DriverForm;