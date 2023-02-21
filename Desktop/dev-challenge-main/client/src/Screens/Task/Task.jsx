import React, { useState } from 'react';
import Add from '../../assets/Images/Add.png';
import { CheckOutlined } from '@ant-design/icons';
import { GiCheckMark } from 'react-icons/gi';
import axios from 'axios';
import { POST } from '../../utils/apis';
import { errorMessage, successMessage } from '../../utils/helpers';
import { Button } from 'antd';

const Task = (props) => {
  const { taskData, getTaskData, user } = props
  const [inputs, setInputs] = useState([])
  const [taskValue, setTaskValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [spin, setSpin] = useState({})

  const handleInputChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index].description = e.target.value;
    setInputs(newInputs);
  };

  const handleStatusChange = (index) => {
    const newInputs = [...inputs];
    newInputs[index].isComplete = !newInputs[index].isComplete;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { description: '', isComplete: false }]);
  };

  const updateStatus = (id, comp) => {
    setSpin({ [id]: true })

    let isCompleted = comp ? false : true
    axios.post(POST.UPDATE_TASKS, { _id: id, isCompleted: isCompleted })
      .then((res) => {
        const { data } = res
        if (data.success) {
          console.log('data', data)
          successMessage(data?.message)
          setSpin({})
          getTaskData()
        }
      }).catch((e) => {
        console.log('e', e)
        setSpin({})
        errorMessage(e)
      })
  }

  const addTask = () => {
    setLoading(true)
    let obj = {
      userId: user?._id,
      description: taskValue
    }
    // console.log('obk', obj)
    axios.post(POST?.ADD_TASKS, obj)
      .then((res) => {
        const { data } = res
        if (data.success) {
          console.log('data', data)
          successMessage(data?.message)
          getTaskData()
        }
        setLoading(false)
      }).catch((e) => {
        console.log('e', e)
        errorMessage(e)
        setLoading(false)
      })
  }

  return (
    <div className="Task_main_section">
      <div className="Sports_haeding">
        <h1>Task</h1>
      </div>
      {
        taskData?.map((v, index) => {
          return (
            <div key={index} className="Inputs_box">
              <input
                disabled
                className="task_input"
                type="text"
                value={v.description}
                placeholder={`Team ${index + 1}`}
              />
              <div className="check_box" onClick={() => updateStatus(v?._id, v?.isCompleted)}>
                <span className='check_icon2' >
                  {spin[v?._id] ? <i class="fa fa-spinner fa-spin">&nbsp;</i> :
                    v?.isCompleted ? <GiCheckMark /> : null
                  }
                </span>
              </div>
            </div>)
        })
      }
      <div className="task_main_input_div">
        <div className="input_div">
          {inputs?.map((input, index) => (
            <div key={index} className="Inputs_box">
              <input
                className="task_input"
                type="text"
                value={taskValue}
                placeholder={`Task ${index + 1}`}
                onChange={(e) => {
                  handleInputChange(index, e)
                  setTaskValue(e?.target?.value)
                }}
              />
              <div className="check_box" disabled={taskValue?.length ? false : true} onClick={addTask}>
                <span className='check_icon2' >
                  {loading === true ?
                    <>
                      {loading && <i class="fa fa-spinner fa-spin">&nbsp;</i>}
                    </>
                    :
                    <span> +</span>
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {inputs?.length >= 1 ?
        <button className="add_task_button">
          <img src={Add} alt="Add" />
        </button>
        :
        < button className="add_task_button" onClick={handleAddInput}>
          <img src={Add} alt="Add" />
        </button>
      }

    </div >
  );
};

export default Task;
