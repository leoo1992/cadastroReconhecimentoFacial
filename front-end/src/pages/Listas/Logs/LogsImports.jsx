import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import '../listas.css';
import api from '../axiosConfig';
import DataTable from 'react-data-table-component';
import { Triangle } from 'react-loader-spinner';
import MenuIcon from '../../HomePage/Menuicon';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import casual from 'casual-browserify';
import SubHeaderLogs from './SubHeaderLogs';
import ChartSection from './ChartSection';
import {
  Chart as ChartJS,
  LinearScale, RadialLinearScale, CategoryScale, BarElement, PointElement,
  LineElement, ArcElement, Legend, Title, Filler,
} from 'chart.js';

const ativoEnum = {
  0: "Não",
  1: "Sim",
};

const tipoEnum = {
  0: "Aluno",
  1: "Funcionário",
  2: "Responsável",
  3: "Terceiro",
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend,
  ArcElement
);

const geraGraficoButtonTooltip = (
  <Tooltip id="add-button-tooltip">Mostrar / Ocultar Gráfico</Tooltip>
);

const customText = {
  rowsPerPage: 'Linhas por página:',
  previous: 'Anterior',
  next: 'Próxima',
  loading: 'Carregando',
  noMatch: 'Nenhum registro encontrado',
  page: 'Página',
  of: 'de',
};

const columns = [
  {
    name: 'Id',
    selector: (row) => row.id,
    width: '65px',
    sortable: true,
    reorder: true,
  },
  {
    name: 'Nome',
    selector: (row) => row.pessoaNome,
    sortable: true,
    reorder: true,
  },
  {
    name: 'Tipo',
    selector: (row) => row.pessoaTipo,
    sortable: true,
    reorder: true,
    width: '115px',
  },
  {
    name: 'CPF',
    selector: (row) => row.pessoaCpf,
    sortable: true,
    reorder: true,
    width: '115px',
  },
  {
    name: 'Data Entrada',
    selector: (row) => row.data,
    sortable: true,
    reorder: true,
    width: '120px',
  },
  {
    name: 'Hora Entrada',
    selector: (row) => row.hora,
    sortable: true,
    reorder: true,
    width: '120px',
  },
  {
    name: 'Ativo',
    selector: (row) => row.pessoaAtivo,
    sortable: true,
    reorder: true,
    width: '75px',
  },
];

export {
  React, useState, useEffect, useCallback, api, DataTable, Triangle, MenuIcon, Tooltip, OverlayTrigger, FontAwesomeIcon,
  faChartBar, toast, ToastContainer, jsPDF, XLSX, casual, SubHeaderLogs, ChartSection, ChartJS, LinearScale,
  RadialLinearScale, CategoryScale, BarElement, PointElement, LineElement, ArcElement, Legend, Title, Filler,
  ativoEnum, tipoEnum, geraGraficoButtonTooltip, customText, columns
};
