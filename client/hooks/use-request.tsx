import axios from 'axios';
import { useState } from 'react';

// method comes either as get, post, delete
const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await axios[method](url, body);

      return res.data;
    } catch (errors) {
      <div className="text-center">
        <h4>Something went wrong</h4>
        <ul>
          {errors?.[0].map((err, index) => (
            <li className="container px-5 py-2 my-2 bg-red-200 rounded-md" key={index}>
              {err.message}
            </li>
          ))}
        </ul>
      </div>;
    }
  };

  return { doRequest, errors };
};

export default useRequest;
