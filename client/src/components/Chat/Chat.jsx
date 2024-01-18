import { Box, Button, Fab, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import"./Chat.Module.css"

function Chat({ socket }) {
    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])
    const [value, setValue] = useState()
    const bottomRef = useRef()

    useEffect(() => {
        socket.on('receive_message', data => {
            setMessageList((current) => [...current, data])
        })

        return () => socket.off('receive_message')
    }, [socket])

    const handleSubmit = () => {
        const message = value;
        if (!message.trim()) return

        socket.emit('message', message)
        clearInput()
        // focusInput()
    }

    useEffect(()=>{
        scrollDown()
      }, [messageList])

    const clearInput = () => {
        setValue('');
    }

    const getEnterKey = (e) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    const scrollDown = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Box
            sx={{
                justifyContent: "center",
                alignItems: 'center',
                display: 'flex',
                height: '100vh',
                // boxShadow: '5px 5px 15px 5px rgba(0, 0, 0, 0.3)'
            }}
        >
            <Box
                sx={{
                    width: '400px',
                    backgroundColor: '#626A7C',
                    borderRadius: '7px',
                    height: '600px',
                }}
            >
                <Box
                    sx={{
                        padding: '0 10px',
                        height: '550px',
                        overflowY: 'scroll',
                        display: "flex",
                        flexDirection: 'column'
                    }}
                >
                    {
                        messageList.map((message, index) => (
                            // <p key={index}>{message.author}: {message.text}</p>
                            <div
                                style={{
                                    maxWidth: '250px',
                                    width: 'fit-content',
                                    backgroundColor: 'lightgrey',
                                    marginTop: '10px',
                                    padding: '5px 10px',
                                    borderRadius: '7px',
                                    alignSelf: 'start',

                                    /* Condição para adicionar estilos específicos se a condição for verdadeira */
                                    ...(message.authorId !== socket.id && {
                                        alignSelf: 'end',
                                        backgroundColor: 'skyblue'
                                    }),
                                }}
                                key={index}
                            >
                                <div className="message-author"><strong>{message.author}</strong></div>
                                <div className="message-text">{message.text}</div>
                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </Box>
                <Box
                    sx={{
                        height: '50px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0px 10px',
                        boxSizing: 'border-box',
                        bottom: 0
                    }}
                >
                    <TextField
                        // ref={messageRef}
                        style={{ width: '100%' }}
                        placeholder="Mensagem"
                        variant="standard"
                        value={value}
                        onChange={(message) => { setValue(message.target.value) }}
                        onKeyDown={(e)=>getEnterKey(e)}
                        fullWidth
                    />
                    <SendIcon
                        sx={{ m: 1, cursor: 'pointer' }}
                        onClick={() => handleSubmit()}
                    />
                    {/* <input
                        type="text"
                        placeholder="Mensagem"
                        ref={messageRef}
                    />*/}
                    {/* <button
                        onClick={() => handleSubmit()}
                    >Enviar</button> */}
                </Box>
            </Box>
        </Box >
    )
}

export default Chat;