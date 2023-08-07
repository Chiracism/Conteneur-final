// material
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
// components
import Page from '../components/Page';
import {
  VesselStats,
  AgenceStats,
  PortStats,
  ClientStats,
  AppWebsiteVisits,
  AppCurrentVisits
} from '../components/_dashboard/app';

import { fShortenNumber } from '../utils/formatNumber';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [podNumb, setPodNumb] = useState(0);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/stat/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setPodNumb(value.data.UserStat);
      })
      .catch(() => {});
  }, []);

  return (
    <Page title="Dashboard | LMC App">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Statistiques</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <ClientStats />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VesselStats />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PortStats />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AgenceStats />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Visites sur le logiciel "
              subheader="Année En cours"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023'
              ]}
              chartData={[
                {
                  name: 'Client',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                },
                {
                  name: 'Mouvement',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
                },
                {
                  name: 'Opération Surestarie',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
                }
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Visites Actuelles"
              chartData={[
                { label: 'Conteneurs', value: 4344 },
                { label: 'Surestaries', value: 5435 },
                { label: 'Utilisateurs', value: 1767 },
                { label: 'Clients', value: 4443 }
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
