import { useState } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import './App.css';
import { extendBorsh } from './borsh'
import { getStreamData } from './schema';

function App() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState({
    start_time: "",
    end_time: "",
    paused: "",
    withdraw_limit: "",
    amount: "",
    sender: "",
    recipient: "",
    withdrawn: "",
    paused_at: "",
  });

  extendBorsh();

  const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address) return;

    getStreamData(conn, new PublicKey(address))
      .then(response => {
        setData({
          start_time: response.start_time.toString(),
          end_time: response.end_time.toString(),
          paused: response.paused.toString(),
          withdraw_limit: response.withdraw_limit.toString(),
          amount: response.amount.toString(),
          sender: response.sender.toString(),
          recipient: response.recipient.toString(),
          withdrawn: response.withdrawn.toString(),
          paused_at: response.paused_at.toString(),
        })
      })
      .catch(e => console.log(e));
  }

  return (
    <section className='section-center'>
      <h3>Account Data Viewer</h3>
      <form id='form1' className='address-form' onSubmit={handleSubmit}>
        <label htmlFor='accountaddress'>
          Acount Address
        </label>
        <input id='accountaddess' type='text' name='accountaddress' value={address} onChange={(e) => setAddress(e.target.value)} />
        <button className='btn' type='submit'>Submit</button>
      </form>

      <article>
        {
          data.start_time &&
          <div>
            <ul>
              <li>Start Time: {data.start_time}</li>
              <li>End Time: {data.end_time}</li>
              <li>Paused: {data.paused}</li>
              <li>Withdraw limit: {data.withdraw_limit}</li>
              <li>Amount: {data.amount}</li>
              <li>Sender: {data.sender}</li>
              <li>Recipient: {data.recipient}</li>
              <li>Withdrawn: {data.withdrawn}</li>
              <li>paused_at: {data.paused_at}</li>
            </ul>
          </div>
        }
      </article>
    </section>
  );
}

export default App;
