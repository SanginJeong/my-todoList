import React from 'react'
import './HomePage.style.css';
import HomeComponent from './homeComponent/HomeComponent';
import { introduceList } from './IntroduceList';
const HomePage = () => {
  return (
      <HomeComponent>
        {introduceList.map((obj)=>(
          <HomeComponent.row>
            <HomeComponent.categoryTitle>{obj.categoryTitle}</HomeComponent.categoryTitle>
            {obj.categoryArea &&
              <HomeComponent.categoryArea img={obj.categoryArea.img}>
              {obj.categoryArea.introduce}
              </HomeComponent.categoryArea>
            }
          </HomeComponent.row>
        ))}
      </HomeComponent>
  )
}

export default HomePage