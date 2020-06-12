// order.jsx
import React from 'react';
import firebase from '../firebase';
// import { toUnicode } from 'punycode';
// import { tsModuleBlock } from '@babel/types';

const Order = ({ index, Order, getordersFromFirestore }) => {
  // timestamp形式のデータをいい感じの形式に変換する関数
  const convertFromTimestampToDatetime = timestamp => {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
  }

  // ↓追加 ドキュメントIDを指定してFirestoreのデータを更新する関数
  const updateDataOnFirestore = async (collectionName, documentId, isDone) => {
    const updatedData = await firebase.firestore()
      .collection(collectionName)
      .doc(documentId)
      .update({
        isDone: isDone ? false : true,
      });
    getordersFromFirestore();
    return
  }

  // ↓追加 ドキュメントIDを指定してFirestoreのデータを削除する関数
  const deleteDataOnFirestore = async (collectionName, documentId) => {
    const removedData = await firebase.firestore()
      .collection(collectionName)
      .doc(documentId)
      .delete();
    getordersFromFirestore();
    return
  }

  return (
    <li key={index} id={Order.id}>
      <input type="checkbox" 
       value={Order.id}
       chacked={Order.data.isDone}
       onChange={e => updateDataOnFirestore('orders', Order.id, Order.data.isDone)} />

      <button value={Order.id}
      onClick={e =>deleteDataOnFirestore('orders',Order.id)}
      >delete</button>

　　　{

      !Order.data.isDone
      ? <div>
      <p>得意先ls:{Order.data.custmercode} 商品：{Order.data.itemcode}　受注数量：{Order.data.orderquatity}</p>
      <p>受注日：{convertFromTimestampToDatetime(Order.data.orderday)}</p>
      </div>
      :<div>
      <p><del>得意先:{Order.data.custmercode} 商品：{Order.data.itemcode}　受注数量：{Order.data.orderquatity}</del></p>
      <p><del>受注日：{convertFromTimestampToDatetime(Order.data.orderday)}</del></p>
      </div>
  }

    </li>
  )
}
export default Order;