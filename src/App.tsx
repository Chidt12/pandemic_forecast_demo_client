import React, { useMemo, useState } from 'react';
import { useAsync } from 'react-use';
import Fetch from 'services/Fetch';

import { defaults } from 'react-chartjs-2';
// Disable animating charts by default.
defaults.animation = false;
import { Line } from 'react-chartjs-2';
import SelectSearch from 'components/SelectSearch';
import { CgSpinnerTwoAlt } from 'react-icons/cg'; import 'react-icons/cg';
import * as uuid from 'uuid';

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

  const [selected_province, setSelectedProvince] = useState("0");
  const [next_days, setNextDays] = useState(10);
  const [update_data, setUpdateData] = useState<string[]>([]);

  const [on_loading, setOnLoading] = useState(false);

  const [reload, setReload] = useState("");

  const provinces = useAsync(async () => {
    const res = await Fetch.post<{ label: string, value: number }[]>("/get-province", {})
    return res.data;
  }, [])

  const state_2 = useAsync(async () => {
    const res = await Fetch.post<string[]>("/get-dates", {})

    return res.data
  }, [reload])

  const state = useAsync(async () => {
    const res = await Fetch.post<{
      code: number,
      data: {
        linear_pred_y: number[],
        linear_pred_x: number[],
        train_data_y: number[],
        train_data_x: number[],
        dates: string[]
      }
    }>("/get-data", {
      province_id: selected_province,
      next_days_num: next_days
    })

    console.log(res.data.data.dates);

    return res.data.data;
  }, [selected_province, next_days])

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

      var new_labels: string[] = []
      var labels = [...state.value.dates]

      var start_date = new Date(labels[0]);

      for (let index = 0; index < labels.length; index++) {
        var element = labels[index];
        if (element == "Null") {
          var new_date = new Date((new Date()).setDate(start_date.getDate() + index))
          element = `${new_date.getFullYear()}-${new_date.getMonth() < 12 ? new_date.getMonth() + 1 : 1}-${new_date.getDate()}`;
        }

        new_labels.push(element)
      }

      return {
        labels: new_labels,
        datasets: datasets
      }
    }
    return null;
  }, [state.value])

  const onClick = async () => {
    setOnLoading(true);
    var res = await Fetch.post("/click-fetch", {

    });
    setOnLoading(false);
    setReload(uuid.v4())

  }

  return (
    <div className="App mt-10">
      <div className="flex items-start">
        <div className="lg:w-1/2 w-1/3 px-10">
          <div className="">

            <div className="w-full">
              {provinces.value && <div>
                <SelectSearch
                  data={provinces.value.map((province) => ({ value: province.value.toString(), label: province.label }))}
                  defaultValue={''}
                  value={selected_province}
                  onChangeFunc={(e) => setSelectedProvince(e.value)}
                />
              </div>}
            </div>
            <div className="w-full mt-5">
              <input type="number" placeholder="" value={next_days} name="" onChange={(e) => setNextDays(parseInt(e.target.value))} className="w-full outline-none focus:outline-none border border-black border-opacity-20 focus:border-opacity-90 px-4 py-2 rounded text-base" id="" step={1} min={1} />
            </div>

            <div className='mt-3'>
              <button onClick={onClick} className='flex justify-center items-center px-3 py-1 rounded bg-primary font-medium text-white w-40'>
                <span>Fetch Data</span>
                {on_loading && <span className=' animate-spin'>
                  <CgSpinnerTwoAlt />
                </span>}
              </button>
            </div>

            <div className='mt-3'>
              <h3>Crawled Dates</h3>
              <div className='h-52 overflow-y-auto'>
                {state_2.value && state_2.value.map((date, index) => (
                  <div className='mt-1.5'>
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-2/3 px-10">
          {
            data && (
              //@ts-ignore
              <Line data={data} options={options} />
            )
          }

        </div>
      </div>
    </div>
  );
}

export default App;
