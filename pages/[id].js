import Layout from '../components/layout.js';


//question for later - is "lib" naming Next.js convention or optional? 
import { getPeopleIds, getData } from '../lib/data.js'


//create getstaticprops to return all the data for one person

export async function getStaticProps({ params }) {

    const personData = await getData(params.id);

    return {
        props: {
            personData
        }
    };
}

//all possible URLs 
export async function getStaticPaths() {

    const dynamicPaths = getPeopleIds();

    return {
        paths: dynamicPaths,
        fallback: false
    };
}

//make a compoenent that will display the persons details at the dynamic route 

export default function Entry ( { personData }){
    return (
        <Layout>
            <article className="card col-6">
                <div className="card-body">
                    <h5 className="card-title">
                        {personData.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted"> 
                        {personData.job}
                    </h6>
                    <p className="card-text">{personData.name} was {personData.age} years old at the time of the Fellowship of the Ring.</p>
                    <a href={"mailto:" + personData.email} className="card-link"> Email {personData.name}</a>
                </div>
            </article>
        </Layout>
    )

}