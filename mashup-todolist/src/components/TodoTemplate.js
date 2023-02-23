import React from 'react';
import styled from 'styled-components';

const TodoTemplateBox = styled.div`
  width: 512px;
  height: 768px;
 
  position: relative; /*추후 박스 하단에 추가 버튼을 위치시키기위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

function TodoTemplate({ children }) {
  return (
    <TodoTemplateBox>{children}</TodoTemplateBox>
  );
}

export default TodoTemplate;