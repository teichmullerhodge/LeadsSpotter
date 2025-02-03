import './companycard.css'
import { JSX } from "solid-js";
import { FiCheckCircle, FiClock, FiInfo, FiXOctagon } from "solid-icons/fi";

enum LeadStatus {

    New = 0, //without any contact
    Open = 1,
    Won = 2,
    Lost = 3

}

interface CompanyCardProperties {

    id?: number,
    name?: string,
    phone?: string,
    photoUrl?: string,
    city?: string,
    state?: string,
    createdAt?: string,
    updatedAt?: string,
    statusId: LeadStatus,
    ownerId?: number,
    contact?: string,

}

const sampleCompany: CompanyCardProperties = {

    id: 0,
    name: "Sunhub",
    createdAt: "31/10/2024",
    updatedAt: "31/10/2024",
    phone: "(43) 99670-6748",
    contact: "Dono da empresa",
    photoUrl: "https://cdn-icons-png.flaticon.com/512/15781/15781000.png",
    city: "Londrina",
    state: "PR",
    statusId: 1,
    ownerId: 0
};

interface StatusIconProperties {


    status: LeadStatus
}

function StatusIcon(properties: StatusIconProperties) {

    let icon: JSX.Element = <FiClock size={22}/>; //assuming the first state.
    let className: string = "status-container new"; //assuming the first state as well.

    switch(properties.status){
        case LeadStatus.New:
            break;
        case LeadStatus.Open:
            icon = <FiInfo size={22}/>
            className = "status-container open"
            break;
        case LeadStatus.Won:
            icon = <FiCheckCircle size={22}/>
            className = "status-container won"
            break;
        case LeadStatus.Lost:
            icon = <FiXOctagon size={22}/>
            className = "status-container lost"
            break;
        default:
            break;
    }    

    return (<div class={className}>
                {icon}
            </div>
    )
}

export default function CompanyCard(properties: CompanyCardProperties) {
    return (
        <div class="card-container">
            <div class="logo-container">
                <img class="company-logo"
                    src={sampleCompany.photoUrl} 
                    width={"40px"} 
                    height={"40px"}
                ></img>
            </div>
            <div class="info-container">
                <span class="card-title">{sampleCompany.name}</span>
                <span class="card-phone">{sampleCompany.phone}</span>
                <span class="card-owner">{sampleCompany.contact}</span>
            </div>
            <StatusIcon status={properties.statusId}/>
        </div>
    );
}