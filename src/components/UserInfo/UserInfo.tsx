import React, {MutableRefObject, useRef, useState} from 'react'
import '../../scss/UserInfo.scss'
import icon from '../../icon_profil.png'
import {useDispatch, useSelector} from "react-redux";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {RootState} from "../../redux/reducers/rootReducer";
import {Dispatch} from "redux";
import {AuthAction, AuthActionTypes} from "../types/auth";
import {changeName, uploadImageD} from "../../redux/actions/auth";
import {newMessage} from "../../redux/reducers/auth";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export default function UserInfo() {
  const {userName, phoneNumber, userId, avatar} : any = useSelector<RootState>(state => ({
    userName: state.auth.currentUser.userName || 'Not name',
    phoneNumber: state.auth.currentUser.email,
    userId: state.auth.currentUser.id,
    avatar: state.auth.currentUser.avatar
  }))


  const divUserName = useRef<HTMLInputElement>(null) as MutableRefObject<HTMLInputElement>
  const dispatch = useDispatch()

  const [userNameState, setUserName] = useState<string>(userName)
  const [isChangeName, setChangeName] = useState<boolean>(false)
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [loadImage, setLoadImage] = useState<any>(null)
  const [error, setError] = useState<any>("")
  const files: any = []

  const changeNameHandler = () => {
    setChangeName(true)
    if (isChangeName) {
      if(userNameState.length === 0 || userNameState.length >= 10) {
        dispatch(newMessage(userNameState.length >= 10 ? 'Имя должно быть не больше 10 символов' :'Поле не должно быть пустым'))
        return
      }
      dispatch(changeName(userNameState))
      setChangeName(false)
      // setOpenModal(true)
    }
  }

  const uploadImage = () => {
    dispatch(uploadImageD(loadImage, userId))
    setOpenModal(false)
  }



  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function onInputFileHandler(e: any) {
    console.log(e.target.files[0].type)
    if (e.target.files[0].type.includes("image")) {
      setError("")
      setLoadImage(e.target.files[0])
    } else {
      setError("Не правильный формат файла")
      dispatch(newMessage("Неправильный формат файла"))
    }
  }


  // @ts-ignore
  return (
    <>
      <div className="header">
        <div onClick={() => setOpenModal(true)} className="header__user-icon">
          <img className="img-icon" src={avatar ? avatar : icon} alt=""/>
        </div>
        <div className="user-info">
          <div className="user-info-name">

            {!isChangeName ?
              <>
              <div className="user-name">{userName}</div>
              </>
              :
              <input ref={divUserName} className="user-input" value={userNameState} onChange={(e) => setUserName(e.target.value)} type="text"/>
            }
            <button className="change_name" onClick={() => changeNameHandler()}>
              {!isChangeName ?
                <img
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/30/000000/external-edit-miscellaneous-kiranshastry-lineal-kiranshastry.png"/>
                :
                <img src="https://img.icons8.com/ios/26/000000/checked--v1.png"/>
              }
            </button>
            {isChangeName ?
              <button className="change_name" onClick={() => setChangeName(false)}>
                <img src="https://img.icons8.com/ios/26/000000/cancel.png"/>
              </button>
              :
              null
            }
          </div>
          <div onChange={() => null} className="user-info-number">+{phoneNumber}</div>

        </div>
      </div>
      <div>
        <Modal
          open={isOpenModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1>Загрузить фото профиля</h1>
            <input id="input__file" accept="image/*" className="input__file" type="file" onChange={(e) => onInputFileHandler(e)}/>
            <label htmlFor="input__file" className="input__file-button">
              <span className="input__file-button-text">Выберите файл</span>
            </label>
            {error ? <h4 className="input__error">{error}</h4> : null}
            {loadImage ?
              <>
                <img className="modal__preview_image" src={URL.createObjectURL(loadImage)} alt="loadImage"/>
                <button className="control-button modal-load" onClick={uploadImage}>Загрузить</button>
              </>
              : null}
          </Box>
        </Modal>
      </div>
    </>

  )
}