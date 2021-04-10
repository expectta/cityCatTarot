import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Portal from "./Potal";

interface Props {
  onClose: any;
  maskClosable: any;
  closable: any;
  visible: boolean;
  children: JSX.Element | JSX.Element[];
}
export default function Modal({
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}: Props) {
  //TODO : type 확인 필요
  const onMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e: any) => {
    if (onClose) {
      onClose(e);
    }
  };
  useEffect(() => {
    document.body.style.cssText = ` top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      // eslint-disable-next-line radix
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);
  return (
    <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        onClick={maskClosable ? onMaskClick : undefined}
        tabIndex={-1}
        visible={visible}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && (
            <ClossButtonWrapper>
              <CloseButton className="modal-close" onClick={close}>
                X
              </CloseButton>
            </ClossButtonWrapper>
          )}
          {children}
          <ConfirmButton onClick={close}>확인</ConfirmButton>
        </ModalInner>
      </ModalWrapper>
    </Portal>
  );
}
interface myStyle {
  visible: boolean;
}
const ClossButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const CloseButton = styled.button`
  background: #d8d8d8;
  color: white;
  padding: 5px 20px 5px 20px;
  border: none;
  border-radius: 20px;
  outline: 0px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #6f6eff;
    color: #fff;
  }
`;

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props: myStyle) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props: myStyle) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  text-align-last: center;
  width: 360px;
  max-width: 480px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px;
  &:focus {
    outline: none;
  }
`;
const ConfirmButton = styled.button`
  background: #6f6eff;
  width: 50%;
  font-size: 1rem;
  color: white;
  padding: 5px 20px 5px 20px;
  border: none;
  border-radius: 20px;
  outline: 0px;
  cursor: pointer;
  text-decoration: none;
`;
