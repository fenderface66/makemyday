import ButtonWrapper from "./ButtonWrapper";

type Props = {
  onClick: () => void;
  "data-testid": string;
};

const CloseIconButton: React.FC<Props> = ({ onClick, ...props }) => (
  <ButtonWrapper onClick={onClick} {...props}>
    <span className="material-icons">close</span>
  </ButtonWrapper>
);

export default CloseIconButton;
