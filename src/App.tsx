import React, { useMemo } from 'react';
import { useAsync } from 'react-use';
import Fetch from 'services/Fetch';

import { defaults } from 'react-chartjs-2';
// Disable animating charts by default.
defaults.animation = false;
import { Line } from 'react-chartjs-2';

const options = {
  responsive: true,
  cutoutPercentage: 10,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const App = () => {

  const state = useAsync(async () => {
    const res = await Fetch.post<{
      code: number,
      data: {
        linear_pred_y: number[],
        linear_pred_x: number[],
        train_data_y: number[],
        train_data_x: number[]
      }
    }>("/get-data", {
      province_id: 0,
      next_days_num: 10
    })

    console.log(res.data.data.linear_pred_x);

    return res.data.data;
  }, [])

  const data = useMemo(() => {
    if (state.value) {

      var datasets = [
        {
          label: 'Real Data',
          data: state.value.train_data_x.slice(0, state.value.train_data_y.length),
          fill: false,
          backgroundColor: '#c20404',
          borderColor: '#c20404',
        },
        {
          label: 'Predict Data',
          data: state.value.linear_pred_x,
          fill: false,
          backgroundColor: '#00c742',
          borderColor: '#00c742',
        },
      ]

      return {
        labels: state.value.linear_pred_y,
        datasets: datasets
      }
    }
    return null;
  }, [state.value])

  const onClick = async () => {
    var res = await Fetch.post("/fetch-data", {

    });

    console.log(res.data);
  }

  return (
    <div className="App">
      <div className="lg:w-1/2 w-2/3 mx-auto">
        {
          data && (
            //@ts-ignore
            <Line data={data} options={options} />
          )
        }

        <div className="mt-5">
          <button className="font-medium text-sm px-5 py-1 rounded bg-primary text-white shadow" onClick={onClick}>UPDATE DATA</button>
        </div>
      </div>
    </div>
  );
}

export default App;
