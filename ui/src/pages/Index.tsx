import Layout from "../layout/Layout";
import Timeline from "../components/Timeline";
import './index.css'
export default function Index() {

    return(
            <Layout activeRoute="index">
                <div class="index-container">
                    <Timeline/>
                    <h1>Hello, world!</h1>
                </div>
            </Layout>
        )
    
}