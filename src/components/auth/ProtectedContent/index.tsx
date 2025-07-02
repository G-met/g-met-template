interface ProtectedContentProps {
  children: React.ReactNode;
  showComponent: boolean;
}

export const ProtectedContent = ({
  children,
  showComponent = true,
}: ProtectedContentProps) => {
  if (!showComponent) return null;
  return <>{children}</>;
};
