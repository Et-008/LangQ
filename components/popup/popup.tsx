'use client'
import React, { Ref, useImperativeHandle, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popup.css'; // Import the CSS file

export default function Popup({ refFromProps }: { refFromProps: Ref<any> }) {

    const [open, setOpen] = useState<boolean>(false);

    useImperativeHandle(refFromProps, () => {
        return {
            openModal: setOpen(true)
        }
    })

    return (
        <Popup position="right center" modal nested open={open} onClose={() => setOpen(false)} closeOnEscape >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> GeeksforGeeks </div>
                    <div className="content">
                        This is a simple popup example.
                    </div>
                    <div className="actions">
                        <button className="button" onClick={() => {
                            console.log('Button clicked');
                            close();
                        }}>Click here</button>
                    </div>
                </div>
            )}
        </Popup>
    );
}
