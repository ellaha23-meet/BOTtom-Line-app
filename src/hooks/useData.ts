import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import trendingCsv from '../data/trending.csv?raw';
import fieldsCsv from '../data/fields.csv?raw';

export type FieldTool = {
  field: string;
  rank: string;
  toolName: string;
  whyRecommended: string;
  url: string;
  dataRecency: string;
};

export type TrendingTool = {
  dateLogged: string;
  toolName: string;
  category: string;
  mentions: number;
  description: string;
  sourceLink: string;
};

// Parse data synchronously once
let parsedTrendingTools: TrendingTool[] = [];
let parsedFieldTools: Record<string, FieldTool[]> = {};
let parseError: string | null = null;

try {
  const text1 = trendingCsv;
  const text2 = fieldsCsv;

  // Parse Trending Tools
  const parsed1 = Papa.parse(text1, { header: true, skipEmptyLines: true });
  const trending: TrendingTool[] = [];
  for (const row of parsed1.data as any[]) {
    if (!row['Tool Name']) continue;
    trending.push({
      dateLogged: row['Date Logged'],
      toolName: row['Tool Name'],
      category: row['Use Cases'] || row['Category'] || '',
      mentions: parseInt(row['Positive Sources'], 10) || 0,
      description: row['Description'],
      sourceLink: row['Source Link'] === 'Not provided in text.' ? '' : row['Source Link']
    });
  }
  // Sort by mentions descending
  trending.sort((a, b) => b.mentions - a.mentions);
  parsedTrendingTools = trending;

  // Parse Field Tools
  const parsed2 = Papa.parse(text2, { header: true, skipEmptyLines: true });
  const fields: Record<string, FieldTool[]> = {};
  let currentField = '';
  for (const row of parsed2.data as any[]) {
    const fieldRaw = row['Field/Action'];
    if (fieldRaw && fieldRaw.trim() !== '') {
      currentField = fieldRaw.trim();
    }
    if (!currentField) continue;
    if (!row['Tool Name']) continue; // Skip empty rows

    if (!fields[currentField]) {
      fields[currentField] = [];
    }
    fields[currentField].push({
      field: currentField,
      rank: row['Rank'],
      toolName: row['Tool Name'],
      whyRecommended: row['Why it\'s Recommended'],
      url: row['URL'],
      dataRecency: row['Data Recency']
    });
  }
  parsedFieldTools = fields;
} catch (err: any) {
  console.error("Error loading data", err);
  parseError = err.message || "An error occurred while loading data.";
}

export function useData() {
  return { 
    fieldTools: parsedFieldTools, 
    trendingTools: parsedTrendingTools, 
    loading: false, 
    error: parseError 
  };
}
