import React, {FC} from 'react';

const ToolMessage: FC = ({message}: any) => {


  return (
    <div className='wrapper-message'>
      <div className='message'>
        {message}
      </div>
    </div>
  );
};

export default ToolMessage;