import React from 'react';
import Layout from '../layout/Layout';
import { Card } from 'react-bootstrap';

const Home = () => {
    return (
        <Layout sidebar={true}>
            <div className="vv-dashboard">
                <Card>
                    <Card.Body>
                        <h4 className='fw-700 mb-0 text-center'>Welcome to Voice Changer</h4>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    )
}

export default Home