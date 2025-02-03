import { FiFilter, FiInfo, FiSearch } from "solid-icons/fi";
import CompanyCard from "./CompanyCard";
import './timeline.css';
import Entry from "./Entry";
import Touchable from "./Touchable";


interface TimelineProperties {

    userId?: number,

}

export default function Timeline(properties: TimelineProperties) {
    return (
        <div class="timeline">
            <span class="timeline-title">Resumo <FiInfo/></span>
            <div class="filters-container">
                <Entry 
                    type="search"
                    icon={<FiSearch/>}
                    value=""
                    placeholder="Buscar..."
                    style={{width: "80%"}}
                />
                <Touchable
                    text="Filtros"
                    icon={<FiFilter/>}
                    style={{width: "30%"}}

                />
            </div>
            <div class="timeline-container">
                <CompanyCard statusId={2}/>
                <CompanyCard statusId={1}/>
                <CompanyCard statusId={3}/>
                <CompanyCard statusId={3}/>
                <CompanyCard statusId={1}/>
                <CompanyCard statusId={0}/>
                <CompanyCard statusId={0}/>
                <CompanyCard statusId={2}/>
                <CompanyCard statusId={1}/>
                <CompanyCard statusId={2}/>
                <CompanyCard statusId={1}/>
                <CompanyCard statusId={0}/>
                <CompanyCard statusId={2}/>

            </div>
        </div>
    );
}