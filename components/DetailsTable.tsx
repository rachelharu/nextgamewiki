import React from 'react';
import { Anchor, Table, Text } from '@mantine/core';
import classes from './DetailsTable.module.css';

interface DetailsTableProps {
  genres: { name: string }[];
  releaseDate?: string;
  esrb_rating?: string;
  publishers?: string[];
  developers?: string[];
  metacritic?: number;
  metacritic_url?: string;
  platforms?: { name: string }[];
}

const data = [
  { title: 'Genre:', key: 'genres' },
  { title: 'Platforms:', key: 'platforms' },
  { title: 'Release date:', key: 'releaseDate' },
  { title: 'Company:', 
    render: (props: DetailsTableProps) => {
      const devs = props.developers?.join(', ') || '';
      const pubs = props.publishers?.join(', ') || '';
      if (devs && pubs) return `${devs} | ${pubs}`;
      if (devs) return devs;
      if (pubs) return pubs;
      return 'N/A'; 
    },
  },
  { title: 'ESRB:', key: 'esrb_rating' },
  { title: 'Metacritic:',
    render: (props: DetailsTableProps) => {
      if (props.metacritic && props.metacritic_url) {
        return (
          <Anchor href={props.metacritic_url} target="_blank" c="#dee0e6" underline="always">
            <Text fz="md" className={classes.text}>
              {props.metacritic}
            </Text>
          </Anchor>
        );
      }
      return 'N/A';
    },
  }
];

const DetailsTable = (props: DetailsTableProps) => (
  <Table verticalSpacing="xs" withRowBorders={false}>
    <Table.Tbody>
      {data.map((row) => (
        <Table.Tr key={row.title} >
          <Table.Td pt="xl" pb="xl">
            <Text fz="md" fw={300}>{row.title}</Text>
          </Table.Td>
          <Table.Td pt="xl" pb="xl">
            <Text ta="left" fz="md" className={classes.text}>
              {'render' in row && typeof row.render === 'function'
              ? row.render(props)
              : 
               (() => {
                // Custom rendering for genres (array of objects)
                if (row.key === 'genres') {
                  return props.genres && props.genres.length
                    ? props.genres.map((g, i) => (
                      <Anchor key={g.name} c="#dee0e6" underline="always">
                        <span>
                          <span style={{ textDecoration: 'underline' }}>{g.name}</span>
                          {i < props.genres.length - 1 && ' - '}
                        </span>
                      </Anchor>
                      ))
                    : 'N/A';
                }
                // Custom rendering for platforms (array of objects)
                if (row.key === 'platforms') {
                  return props.platforms && props.platforms.length
                    ? props.platforms.map((p, i) => (
                      <Anchor key={p.name} c="#dee0e6" underline="never">
                        <span>
                          {p.name}
                          {i < (props.platforms?.length ?? 0) - 1 && ', '}
                        </span>
                      </Anchor>
                      ))
                    : 'N/A';
                }
                // Default rendering for other fields
                const value = props[row.key as keyof DetailsTableProps];
                return value !== undefined && value !== null && value !== ''
                  ? String(value)
                  : 'N/A';
              })()}
            </Text>
          </Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
);

export default DetailsTable;