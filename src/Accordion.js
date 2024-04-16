import {useState} from "react";
const data = [
    {
        id:1,
        title: "Accordion Title 1",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, nemo.",
        show: false
    },
    {
        id:2,
        title: "Accordion Title 2",
        desc:"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, nemo consectetur adipisicing elit. Voluptatem, nemo.",
        show: false
    },
    {
        id:3,
        title: "Accordion Title 3",
        desc:"Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur. Voluptatem, nemo adipisicing elit. Voluptatem, nemo.",
        show: false
    },
    {
        id:4,
        title: "Accordion Title 4",
        desc:"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, nemo. adipisicing elit. Voluptatem, nemo. consectetur adipisicing elit. Voluptatem, nemo.",
        show: false
    }
]
const ItemOne = ({title,desc,show}) => {
    console.log("App > Accordion > AccordionBox > AccordionOne > ItemOne");
    const [showNow,chShow] = useState(show);
    return(
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button onClick={() => chShow(o => !o)} className="accordion-button collapsed text-bg-info" type="button">{title}</button>
            </h2>
            <div className={`accordion-collapse collapse ${showNow ? 'show':''}`}>
                <div className="accordion-body">{desc}</div>
            </div>
        </div>
    )
}
const AccordionOne = () => {
    console.log("App > Accordion > AccordionBox > AccordionOne");
    return(
        <div className="accordion accordion-flush p-0">
            {data.map((val) => <ItemOne key={val.id} {...val} />)}
        </div>
    )
}
const ItemTwo = ({id,title,desc,show,updateState}) => {
    console.log("App > Accordion > AccordionBox > AccordionTwo > ItemTwo");
    return(
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button onClick={() => updateState(id,show)} className="accordion-button collapsed text-bg-info" type="button">{title}</button>
            </h2>
            <div className={`accordion-collapse collapse ${show ? 'show':''}`}>
                <div className="accordion-body">{desc}</div>
            </div>
        </div>
    )
}
const AccordionTwo = () => {
    console.log("App > Accordion > AccordionBox > AccordionTwo");
    const [state,updtState] = useState(data);
    const updateState = (id,show) => {
        updtState((old) => old.map(obj => obj.id === id ? {...obj,show:!show}:{...obj,show:false}));
    }
    return(
        <div className="accordion accordion-flush p-0">
            {state.map((val) => <ItemTwo key={val.id} {...val} updateState={updateState} />)}
        </div>
    )
}
const AccordionBox = ({title,children}) => {
    console.log("App > Accordion > AccordionBox");
    return(
        <div className="container my-3">
            <div className="row py-2 text-bg-primary justify-content-around align-items-center">
                <div className="col-md-4 mx-auto text-center">
                    <h1>{title}</h1>
                </div>
            </div>
            <div className="row">
                {children}
            </div>
        </div>
    )
}
const Accordion = () => {
    console.log("App > Accordion");
    return(
        <>
            <AccordionBox title="Accordion - 1" >
                <AccordionOne />
            </AccordionBox>
            <AccordionBox title="Accordion - 2" >
                <AccordionTwo />
            </AccordionBox>
        </>
    )
}
export default Accordion;