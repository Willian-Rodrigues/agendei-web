import { Box, List, Drawer, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/auth.context';
import { Link } from '../../ui/link/link.component';

interface MenuItems {
  link: string;
  name: string;
  icon: JSX.Element;
  signOut?: boolean;
  auth?: boolean;
}

interface NavigationDrawerProps {
  menuItems: MenuItems[];
  open: boolean;
  onClose: () => void;
}

export const DrawerComponent: React.FC<NavigationDrawerProps> = ({
  menuItems,
  open,
  onClose
}) => {
  const { user, signOut } = useAuth();
  const { route } = useRouter();
  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose}>
      {user && (
        <Link href={`/profile/${user?.id}`} onClick={onClose}>
          <Box
            bgcolor={theme =>
              route.includes('/profile')
                ? theme.palette.primary.main
                : 'inherit'
            }
            color={route.includes('/profile') ? 'white' : 'primary.main'}
            height={{ xs: 56, md: 64 }}
            px={2}
            display="flex"
            alignItems="center"
          >
            <Box width={'25%'}>
              <Typography>
                <i className="fa fa-sign-in" />
              </Typography>
            </Box>

            <Typography>Minha Conta</Typography>
          </Box>
        </Link>
      )}
      <Divider />
      <List disablePadding>
        {menuItems
          .filter(item => user || !item?.auth)
          .map(
            item =>
              (item.name !== 'Sair' || !!user) && (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => {
                    if (item?.signOut) {
                      signOut();
                    }
                    onClose();
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    px={2}
                    py={1}
                    width={160}
                    bgcolor={theme =>
                      route === item.link && item.name !== 'Sair'
                        ? theme.palette.primary.main
                        : 'inherit'
                    }
                  >
                    <Box width={'20%'}>
                      <Typography
                        color={
                          route === item.link && item.name !== 'Sair'
                            ? 'white'
                            : 'primary'
                        }
                      >
                        {item.icon}
                      </Typography>
                    </Box>
                    <Typography
                      color={
                        route === item.link && item.name !== 'Sair'
                          ? 'white'
                          : 'primary'
                      }
                      variant="body1"
                      mr={'auto'}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Link>
              )
          )}
      </List>
    </Drawer>
  );
};
