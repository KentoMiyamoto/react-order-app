// ItemList.jsx
import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import InputForm from './InputForm';
import Order from './Order';

const OrderList = props => {

  const [OrderList, setOrderList] = useState(null);

  // firestoreから全データを取得してstateに格納する関数
  const getordersFromFirestore = async () => {
    const orderListArray = await firebase.firestore().collection('orders')
    　.orderBy('isDone')
      .orderBy('custmercode')
      .get();
    const orderArray = orderListArray.docs.map(x => {
      return {
        id: x.id,
        data: x.data(),
      }
    })
    setOrderList(orderArray);
    return orderArray;
  }

  // useEffectを利用してFirestoreからデータの一覧を取得．
  useEffect(() => {
    const result = getordersFromFirestore();
  }, [props])

  return (
    <div>

      <InputForm
       getordersFromFirestore = {getordersFromFirestore}
       />  

      <ul>
        {
          OrderList?.map((x, index) =>
          <Order
              key={index}
              Order={x}
              index={index}
              getordersFromFirestore= {getordersFromFirestore}
              />
                    
        //   <li key={index} id={x.id}>
        //       <input type="checkbox" value={x.id} />
        //       <button value={x.id}>出荷済</button>
        //       <p>得意先：{x.data.custmercode}　商品：{x.data.itemcode}　受注数量：{x.data.orderquatity}</p>
        //       {/* <p>受注日：{x.data.orderday}　</p> */}

        //     </li>

          )
        }
      </ul>
    </div>
  );
}
export default OrderList;