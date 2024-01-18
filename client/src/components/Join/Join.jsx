import React, { useRef, useState } from "react";
import io from 'socket.io-client'
import { Box, Button, TextField, Typography } from "@mui/material";

function Join({ chatSet, setSocket }) {

    // const usernameRef = useRef();
    const [value, setValue] = useState()

    const handleSubmit = async () => {
        // const username = usernameRef.current.value
        const username = value;

        if (!username.trim()) return
        alert(username);
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', username)
        setSocket(socket)
        chatSet(true)
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
                    minWidth: '270px',
                    maxWidth: '800px',
                    backgroundColor: '#626A7C',
                    justifyContent: "center",
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '30px',
                    alignItems: 'center',
                    borderRadius: '7px',
                }}
            >
                <Typography variant="h4" color="inherit" component="div" style={{ marginTop: -1, padding: '2%', color: '#1E2A44' }}>
                    <strong>Bem Vindo</strong>
                </Typography>
                <TextField
                    // ref={usernameRef}
                    style={{ margin: '7px', maxWidth: 400, width: '100%' }}
                    placeholder="Nome"
                    variant="standard"
                    onChange={(login) => { setValue(login.target.value) }}
                />
                {/* <input
                    type="text"
                    placeholder="Nome"
                    ref={usernameRef}
                /> */}
                <Button
                    style={{ margin: '4px',
                     color: '#1E2A44',
                     backgroundColor: '#A5AAB4' 
                    }}
                    onClick={() => handleSubmit()}
                    variant="contained"
                >
                    <strong>Login</strong>
                </Button>
                {/* <button
                    onClick={() => handleSubmit()}
                >Entrar</button> */}
            </Box>
        </Box>
    )
}

export default Join;