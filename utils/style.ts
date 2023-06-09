import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  label {
    color: ${({ theme }) => theme.colors.tabletext};
  }
`;

export const HeroText = styled.p`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textdefault};
`;

export const InputSelect = styled.select<{ showarrow?: boolean }>`
  border: none;
  outline: none;
  min-width: 260px;
  padding: 0.4rem 0;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tabletext};
  color: ${({ theme }) => theme.colors.textdefault};
  appearance: ${({ showarrow }) => (showarrow ? 'auto' : 'none')};
`;
