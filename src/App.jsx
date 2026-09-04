import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

function App() {
  const [user, setUser] = useState(null)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    // Get the currently logged-in user
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (data.user) {
        setUser(data.user)
        await fetchLogs()
      }
    }

    loadUser()

    // Listen for authentication changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      // Only record when an actual login happens
      if (event === 'SIGNED_IN' && session?.user) {
        await saveLogin(session.user)
        await fetchLogs()
      }

      if (event === 'SIGNED_OUT') {
        setLogs([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Call the Edge Function
  const saveLogin = async (currentUser) => {
    const { data, error } = await supabase.functions.invoke(
      'record-login',
      {
        body: {
          user_id: currentUser.id,
          email: currentUser.email,
        },
      }
    )

    if (error) {
      console.error('Edge Function error:', error)
      return
    }

    console.log('Login recorded successfully:', data)
  }

  // Get login history through RPC
  const fetchLogs = async () => {
    const { data, error } = await supabase.rpc(
      'get_login_history'
    )

    if (error) {
      console.error('RPC error:', error.message)
      return
    }

    setLogs(data || [])
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      console.error('Google login error:', error.message)
      alert(error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setLogs([])
  }

  // Login screen
  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1>SamaranAI Assessment</h1>

          <p>Sign in to continue</p>

          <button
            onClick={handleGoogleLogin}
            style={styles.button}
          >
            Continue with Google
          </button>
        </div>
      </div>
    )
  }

  // Logged-in screen
  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1>Welcome!</h1>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Name:</strong>{' '}
          {user.user_metadata?.full_name || 'Not available'}
        </p>

        <button
          onClick={handleLogout}
          style={styles.button}
        >
          Logout
        </button>

        <hr style={{ margin: '30px 0' }} />

        <h2>Login History</h2>

        {logs.length === 0 ? (
          <p>No login records found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.cell}>Email</th>
                <th style={styles.cell}>Login Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td style={styles.cell}>
                    {log.email}
                  </td>

                  <td style={styles.cell}>
                    {new Date(
                      log.logged_in_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
    padding: '30px',
  },

  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    minWidth: '500px',
  },

  button: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    background: '#222',
    color: 'white',
    fontSize: '16px',
    marginTop: '20px',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },

  cell: {
    border: '1px solid #ddd',
    padding: '10px',
  },
}

export default App