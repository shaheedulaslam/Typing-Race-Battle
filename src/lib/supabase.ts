import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveRaceResult = async (playerId: string, playerName: string, wpm: number, accuracy: number) => {
  if (!supabaseUrl) return;
  const { data, error } = await supabase
    .from('leaderboard')
    .insert([{ player_id: playerId, name: playerName, wpm, accuracy, created_at: new Date() }]);
  return { data, error };
};

export const getLeaderboard = async () => {
    if (!supabaseUrl) return [];
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('wpm', { ascending: false })
      .limit(10);
    return data || [];
};
