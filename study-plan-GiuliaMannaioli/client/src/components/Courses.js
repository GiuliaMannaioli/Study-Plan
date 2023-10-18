
import "./ComponentsStyle.css";

import { useState , useEffect } from 'react';
import { Table, Row, Container, Button ,ButtonGroup, ToggleButton  } from 'react-bootstrap';


function CoursesList(props) {
 
  const [radioValue, setRadioValue] = useState('1'); //quindi if radio.value==="1" fulltime
  const [checked, setChecked] = useState(false); //se è true ho gia scelto
  const [empty, setEmpty] = useState(true); //se è true vuol dire che devo scegliere 
  const [career, setCareer] = useState();
  const [totcredits, setTotCredits] = useState([]);
  const [studyPlan, setStudyPlan] = useState(props.courses);
  const [courses, setCourses] = useState([]);

  
  
  useEffect(() => {
    if(!props.generalList) {
        // setStudyPlan(props.studyPlan);
        setTotCredits(props.credits);
        if(props.career){
          setCareer(props.career);
          setChecked(true);
          setEmpty(false);
        }else{ 
          setChecked(false);
          setEmpty(true);
      }
    }else{
      setCourses(props.courses)
    }
  });
  
  
  console.log(courses)
  console.log(studyPlan)
  

  // useEffect(() => {
  //   if(studyPlan){
  //   for (let i in studyPlan){
  //     setTotCredits(totcredits + studyPlan[i].credits);
  //   }
  // }}, [addToStudyPlan, removeFromStudyPlan]);


  
 let  maxcredits = 0;
 let  mincredits = 0;

if(career==='Full Time'){
   maxcredits = 80;
   mincredits = 60;
}else if(career==='Part Time'){
   maxcredits = 40;
   mincredits = 20;
}

const removeFromStudyPlan = (course) =>{

  let flag=false;

for(let i in studyPlan){
  if(course.code===studyPlan[i].preparatory){
    flag=true;
  }
}
  if(!flag){
    setStudyPlan(studyPlan.filter((c)=> c.code!==course.code))
  }

}

const addToStudyPlan = (course) =>{
  
  if(totcredits>=maxcredits || totcredits>=mincredits){

  }else if(course.capacity===course.currentStudentsNumber){
   
  }else if(course.preparatory){
    for(let i in studyPlan){
      if(course.preparatory===studyPlan[i].code){
      
    }
  }
  }else if(course.incompatible){
    for(let i in studyPlan){
      if(course.incompatible===studyPlan[i].code){
     
      }
    }
  }else{
  setStudyPlan((oldCourses)=> [...oldCourses, course]);}  
}

  
  const radios = [
    { name: 'Full-Time', value: '1' },
    { name: 'Part-Time', value: '2' },
  ];
  

    return(<>
   <Container fluid>
        <Row>
          <main >
             {props.generalList ? 
              <h1 id="title">Courses</h1> : <> <h1 id="title">Your Study Plan</h1>
            {empty ?  <Button onClick={()=> setEmpty(false)}> Create </Button> : null }
              {checked ? <> <div> {"Career : "+ career} </div> <div> creditrs inserted :{radios.value==='1' ? 
              <div> {totcredits} / 60-80 </div>:<div> {totcredits} / 20-40 </div>} </div> </> : 
                <> <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant='outline-success' 
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onClick={()=>{setChecked(true)}}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      >
                        {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup> </> }
             </> }
              <CourseTable courses={courses} studyPlan={studyPlan} add={addToStudyPlan} remove={removeFromStudyPlan} 
                                                            generalList={props.generalList} user={props.user} ></CourseTable>  
              {props.generalList ? null :     <div class="d-flex flex-row-reverse"> <Button  variant="success" type="submit"  onClick={()=>{ props.saveStudyPlan(studyPlan) }} > Save </Button>  &nbsp; 
                                     <Button  variant='danger' onClick={()=> props.cancelStudyPlan() }> Cancel </Button> </div> }
     
          </main>
        </Row>
        </Container>
      </>
    );
  }
  



function CourseTable(props) {

let allcourses=[];
  
if(!props.generalList) {
 allcourses = props.studyPlan;
}else{
 allcourses = props.courses;
}

return(
  <ul className="list-group list-group-flush" id="list-courses">
  <div className="row">
    <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Credits</th>
            <th>Students enrolled</th>                         
            <th>Max students</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {
            allcourses.map((c) => <CourseRow course={c}  add={props.add} remove={props.remove} key={c.code} generalList={props.generalList} user={props.user}/> )
          }
        </tbody>
      </Table>
      </div>
</ul>
 )
}


  function CourseRow(props) {
    
  const [show, setShow] = useState(false);


    return(
    <>
      { props.generalList ?
      <>
        <tr>
          <td>{props.course.code}</td>
          <td>{props.course.name}</td>
          <td>{props.course.credits}</td>
          <td>{props.course.currentStudentsNumber}</td>
          <td>{props.course.capacity}</td>
         { (props.course.incompatible||props.course.preparatory) ? <>
         <td> {show ? 
          <div class="d-flex flex-row-reverse"><Button onClick={()=> setShow(false)} > <i className="bi bi-caret-up"></i> </Button> </div> :
          <div class="d-flex flex-row-reverse"><Button onClick={()=> {setShow(true) }} > <i className="bi bi-caret-down"></i> </Button> </div> 
          } </td> </> : <td></td> }
         { props.user ? <td>  <div class="d-flex flex-row-reverse"> <Button onClick={()=> {props.add(props.course)}} >+</Button> </div> </td> : null} 
        </tr> 
        {show ? <> <tr className="table-info">{props.course.preparatory ? <td>Preparatory course : {props.course.preparatory}</td> : null }</tr>
        <tr  className="table-info">{props.course.incompatible ? <td>Incompatible with course  : {props.course.incompatible}</td> : null } </tr> </> : null} 
     </>
      : 
      <>
      <tr>
          <td>{props.course.code}</td>
          <td>{props.course.name}</td>
          <td>{props.course.credits}</td>
          <td>{props.course.currentStudentsNumber}</td>
          <td>{props.course.capacity}</td>{(props.course.incompatible || props.course.preparatory) ? <> 
          <td>{show ? 
         <div class="d-flex flex-row-reverse"><Button onClick={()=> setShow(false)} > <i className="bi bi-caret-up"></i> </Button> </div> :
         <div class="d-flex flex-row-reverse"> <Button onClick={()=> {setShow(true) }} > <i className="bi bi-caret-down"></i> </Button> </div>
          }</td>  </> : <td></td>}   
          <td> <div class="d-flex flex-row-reverse"><Button variant='danger' onClick={()=> {props.remove(props.course) }}><i className='bi bi-trash3'></i></Button>  </div> </td> 
        </tr>
       {show ? <> <tr className="table-info">{props.course.preparatory ? <td>Preparatory course : {props.course.preparatory}</td> : null}</tr> 
       <tr className="table-info">{props.course.incompatible ? <td>Incompatible with course  : {props.course.incompatible}</td> : null }</tr> </> : null} 
    </>}
    </>
    );
  }
  
  
  
  export default CoursesList;