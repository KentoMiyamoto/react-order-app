// InputForm.jsx
import React, { useState } from 'react';
import firebase from '../firebase';

const InputForm = ({ getordersFromFirestore }) => {
  const [custmercode, setcustmercode] = useState('');
  const [orderday, setorderday] = useState('');

  // Firestoreにデータを送信する関数
  const postDataToFirestore = async (collectionName, postData) => {
    const addedData = await firebase.firestore().collection(collectionName).add(postData);
    return addedData;
  }

  // submitボタンクリック時の処理
  const submitData = async () => {
    if (custmercode === '' || orderday === '') { return false };
    const postData = {
      custmercode: custmercode,
      orderday: orderday,
      isDone: false,
    }
    const addedData = await postDataToFirestore('orders', postData);
    setcustmercode('');
    setorderday('');
    getordersFromFirestore();
    
  }

  return (
    <form action="">
      <ul>
        <li>
          <label htmlFor="custmercode">得意先：</label>
          <input
            type="text"
            id="custmer"
            value={custmercode}
            onChange={e => setcustmercode(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="orderday">受注日：</label>
          <input
            type="datetime-local"
            id="orderday"
            value={orderday}
            onChange={e => setorderday(e.target.value)}
          />
        </li>
        <li>
          <button
            type="button"
            onClick={submitData}
          >submit</button>
        </li>
      </ul>
    </form>
  )
}

export default InputForm;