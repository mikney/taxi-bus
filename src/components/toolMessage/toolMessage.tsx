import React, {FC} from 'react';

const ToolMessage: FC<{message: string}> = ({message}: any) => {


  return (
    <div className='wrapper-message'>
      <div className='message'>
        {message}
      </div>
    </div>
  );
};

export default ToolMessage;