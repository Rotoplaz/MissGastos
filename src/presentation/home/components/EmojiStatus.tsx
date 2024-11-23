import { Avatar } from '@ui-kitten/components';
import React from 'react';
import { Category } from '../../categories/components/Category';

interface Props {
    totalMoney: number;
}

export const EmojiStatus = ({ totalMoney  }:Props) => {

    const getAvatarSource = () => {
        if (totalMoney <= 5000) {
          return require("../../assets/images/verylittlemoney.png");
        } else if (totalMoney >= 5001 && totalMoney <= 9999) {
          return require("../../assets/images/littlemoney.png");
        } else if (totalMoney >= 10000 && totalMoney <= 20000) {
          return require("../../assets/images/goodmoney.png");
        } else {
          return require("../../assets/images/bigmoney.jpg");
        }
      };

    return (
        <>
            
          <Avatar
            size="giant"
            style={{ width: 150, height: 150, marginBottom: 20 }}
            source={getAvatarSource()}
          />

        </>
    )
}