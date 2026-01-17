import React from 'react';
import { Anchor, Table, Text } from '@mantine/core';
import classes from './DetailsCard.module.css';

interface DetailsCardProps {
  genres: { name: string }[];
  releaseDate?: string;
  esrb_rating?: string;
  publishers?: string[];
  developers?: string[];
  platforms?: { name: string }[];
  website?: string;
}

const data = [
  { title: 'Genre:', key: 'genres' },
  { title: 'Platforms:', key: 'platforms' },
  { title: 'Release date:', key: 'releaseDate' },
  { title: 'Company:', 
    render: (props: DetailsCardProps) => {
      const devs = props.developers?.join(', ') || '';
      const pubs = props.publishers?.join(', ') || '';
      if (devs && pubs) return `${devs} | ${pubs}`;
      if (devs) return devs;
      if (pubs) return pubs;
      return 'N/A'; 
    },
  },
  { title: 'ESRB:', key: 'esrb_rating' },
  { title: 'Links:', key: 'website', url: 'website' },
];

function isRowEmpty(row: any, props: DetailsCardProps) {
  if ('render' in row && typeof row.render === 'function') {
    const rendered = row.render(props);
    return rendered === undefined || rendered === null || rendered === '' || rendered === 'N/A';
  }
  if (row.key === 'genres') {
    return !props.genres || props.genres.length === 0;
  } 
  if (row.key === 'platforms') {
    return !props.platforms || props.platforms.length === 0;
  }
  const value = props[row.key as keyof DetailsCardProps];
  return value === undefined || value === null || value === '' || value === 'N/A';
}

const DetailsCard = (props: DetailsCardProps) => {
  return(
    <Table verticalSpacing="xs" withRowBorders={false}>
      <Table.Tbody>
        {data
        .filter(row => !isRowEmpty(row, props))
        .map((row) => (
          <Table.Tr key={row.title} >
            <Table.Td pt="lg" pb="lg">
              <Text fz="md" fw={300}>{row.title}</Text>
            </Table.Td>
            <Table.Td pt="lg" pb="lg">
              <Text ta="left" fz="md" className={classes.text}>
                {'render' in row && typeof row.render === 'function'
                ? row.render(props)
                : 
                 (() => {
                  // Custom rendering for genres
                  if (row.key === 'genres') {
                    return props.genres && props.genres.length
                      ? props.genres.map((g, i) => (
                        <Anchor key={g.name} c="#dee0e6" underline="never">
                          <span>
                            <span style={{ textDecoration: 'underline' }}>{g.name}</span>
                            {i < props.genres.length - 1 && ' - '}
                          </span>
                        </Anchor>
                        ))
                      : 'N/A';
                  }
                  // Custom rendering for platforms
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
                  // rendering for other fields
                  const value = props[row.key as keyof DetailsCardProps];
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
};

export default DetailsCard;
