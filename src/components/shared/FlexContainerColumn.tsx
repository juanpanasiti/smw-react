import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

export const FlexContainerColumn = ({ children }: Props) => {
    return <ContainerFake>{children}</ContainerFake>;
};

const ContainerFake = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;
