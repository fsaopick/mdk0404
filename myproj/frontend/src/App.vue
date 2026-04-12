<script setup>
import { onMounted, ref } from 'vue'

const username = ref('')
const message = ref('')
const messages = ref([])
const loading = ref(false)
const error = ref('')

const loadMessages = async () => {
  const response = await fetch('/api/messages')
  messages.value = await response.json()
}

const submitMessage = async () => {
  error.value = ''

  if (!username.value.trim() || !message.value.trim()) {
    error.value = 'Введите имя и сообщение'
    return
  }

  loading.value = true

  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        message: message.value,
      }),
    })

    if (!response.ok) {
      const body = await response.json()
      throw new Error(body.error || 'Ошибка отправки')
    }

    username.value = ''
    message.value = ''
    await loadMessages()
  } catch (submitError) {
    error.value = submitError.message
  } finally {
    loading.value = false
  }
}

onMounted(loadMessages)
</script>

<template>
  <main class="page">
    <section class="card">
      <p class="eyebrow">MyProj</p>
      <h1>Гостевая книга</h1>
      <p class="lead">
        Введите свое имя и сообщение. После отправки запись сохранится в MySQL.
      </p>

      <div class="form">
        <input v-model="username" type="text" placeholder="Ваше имя" />
        <textarea
          v-model="message"
          rows="4"
          placeholder="Ваше сообщение"
        ></textarea>
        <button @click="submitMessage" :disabled="loading">
          {{ loading ? 'Сохраняем...' : 'Отправить сообщение' }}
        </button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </section>

    <section class="card">
      <h2>Сообщения</h2>
      <div v-if="messages.length" class="messages">
        <article v-for="item in messages" :key="item.id" class="message-card">
          <strong>{{ item.username }}</strong>
          <p>{{ item.message }}</p>
          <small>{{ new Date(item.created_at).toLocaleString('ru-RU') }}</small>
        </article>
      </div>
      <p v-else class="empty">Пока нет сообщений. Добавьте первое.</p>
    </section>
  </main>
</template>
