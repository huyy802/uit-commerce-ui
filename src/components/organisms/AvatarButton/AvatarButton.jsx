import { Avatar, IconButton } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import DefaultUser from "../../../assets/icons/default_user.jpg"
import { auth, db, storage } from '../../../firebase/firebase-config'

const AvatarButton = (props) => {
    const { containerStyle } = props

    const [avatar, setAvatar] = useState(null)
    const userRef = doc(db, "users", auth.currentUser?.uid)
    const storageRef = ref(storage, `user-avatars/user-${auth.currentUser?.uid}`)
    const inputRef = useRef()

    useEffect(() => {
        (async () => {
            const userInfoSnap = await getDoc(userRef)

            if (userInfoSnap.exists()) {
                const { avatarId } = userInfoSnap.data()
                setAvatar(avatarId)
            }
            else {
                return
            }
        })()
    }, [])


    //clean up the input ref 
    const cleanUpInput = () => {
        URL.revokeObjectURL(avatar)
        inputRef.current.value = null
    }

    const handleUploadAvatar = (e) => {
        const newAvatar = e.target?.files[0]
        if (newAvatar) {
            //to delete the current avatar before uploading a new one
            if (avatar) cleanUpInput()

            uploadBytes(storageRef, newAvatar)
                .then((snapshot) => {
                    setAvatar(URL.createObjectURL(newAvatar))
                    getDownloadURL(storageRef)
                        .then((url) => {
                            updateDoc(userRef, {
                                avatarId: url
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
        }
    }

    return (
        <div style={{
            alignSelf: "center",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            borderRadius: 180,
            ...containerStyle
        }}>
            <IconButton aria-label="upload picture" component="label">
                <input
                    ref={inputRef}
                    onChange={handleUploadAvatar}
                    hidden
                    accept='image/*'
                    type="file"
                />
                <Avatar
                    sx={{
                        width: "200px", height: "200px",
                        alignSelf: "center"
                    }}
                    src={avatar ? avatar : DefaultUser}
                />
            </IconButton>
        </div>
    )
}

export default AvatarButton