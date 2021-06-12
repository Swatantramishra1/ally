import { useEffect, useState } from 'react';
import { Collapse, Space, List, Select, PageHeader } from 'antd';

import './index.css';

const { Panel } = Collapse;

const Accordions = ({data}) => {
    const [value, setValue] = useState([]);
    const [options, setOptions] = useState([]);
    const [accordionsData, setAccordionsData] = useState([]);
    const [mapData, setMapData] = useState([]);

  useEffect(() => {
      if(data.length > 0) {
        const parentChild = generateChild(data);
        setAccordionsData(parentChild);
        setMapData(parentChild);
        setOptions(createFilterForCategory(parentChild));
      }
  }, [data])


  const generateChild = arr => {
    return arr.reduce((acc, val, _, array) => {
       const childs = [];
       array.forEach((el, i) => {
          if(childs.includes(el.parent_objective_id) || el.parent_objective_id === val.id){
             childs.push(el);
          };
       });
      if(childs.length > 0){
          return acc.concat({...val, childs});
      } else {
          return acc;
      }
    }, []);
 };

 const createFilterForCategory = (data) => {
   const category = data.reduce((acc, dt) => {
        if(!acc[dt.category]) {
          acc[dt.category] = dt.id;
        }
        return acc;
   },{})

   const results = [];
  for (const key in category) {
    results.push({ label: key,value: category[key]})
  }
  return results;
 }

 const handleSelectChange = (value) => {
      setValue(value);
      setTimeout(() => {
        const data = accordionsData.filter(dt => value.indexOf(dt.id) !== -1);
        if(value.length === 0) {
          setMapData(accordionsData);
        } else {
          setMapData(data);
        }
      },0)
 }

  return (
   <div className="accordion-container">
      <PageHeader
      className="site-page-header"
      onBack={() => null}
      backIcon={null}
      title="Ally.io Assignment"
    />  
        <Space direction="vertical" style={{ width: '100%' }}>
        <Select  mode='multiple' onChange={ (newValue) => {
            handleSelectChange(newValue);
          }} maxTagCount='responsive' placeholder={'Select Category...'} options={options} value={value} style={{ width: '100%' }} />
    </Space>
    <div className="list">
        <Space direction="vertical">
        {mapData.map((accordion) => 
            <Collapse key={accordion.id + "collapse"} >
                    <Panel header={`${accordion.title} ( ${accordion.category} )`} key={accordion.id}>
                    <List
                            size="large"
                            dataSource={accordion.childs}
                            renderItem={(item) => <List.Item>{item?.title}</List.Item>}
                            />
                    </Panel>
             </Collapse>
        )}
    
        </Space>
    </div>
   </div>
  )
}

export default Accordions;