import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {Layuot, withLayout} from "../layout/Layout";
import {Header} from "../layout/Header/Header";
import {ArticleCard, Articles} from "../components";
import ArticleService from "../service/article";
import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";

const Home: NextPage = (): JSX.Element => {
  return (
        <>
            <div className="home-page">

                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                  <Articles/>
                </div>

            </div>
        </>
    );
};

export default withLayout(Home);
