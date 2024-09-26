import CountryInfo from './CountryInfo';
import RegionList from './RegionList';
import DepartmentList from './DepartmentList';
import CityList from './CityList';
import AttractionList from './AttractionList';
import InvasiveSpecies from './InvasiveSpecies';
import RadioList from './RadioList';

export const dashboardRoutes = [
  {
    path: 'country-info',
    name: 'Información General',
    component: CountryInfo
  },
  {
    path: 'regions',
    name: 'Regiones',
    component: RegionList
  },
  {
    path: 'departments',
    name: 'Departamentos',
    component: DepartmentList
  },
  {
    path: 'cities',
    name: 'Ciudades',
    component: CityList
  },
  {
    path: 'attractions',
    name: 'Atracciones',
    component: AttractionList
  },
  {
    path: 'invasive-species',
    name: 'Especies Invasivas',
    component: InvasiveSpecies
  },
  {
    path: 'radios',
    name: 'Radios',
    component: RadioList
  }
];